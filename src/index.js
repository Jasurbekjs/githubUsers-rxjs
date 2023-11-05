import { EMPTY, fromEvent } from 'rxjs'
import { catchError, debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const url = 'https://api.github.com/search/users?q=';

const search = document.getElementById('search')
const result = document.getElementById('result')

const stream$ = fromEvent(search, 'input').pipe(
    map(v=>v.target.value),
    debounceTime(500),
    distinctUntilChanged(),
    tap(()=>result.innerHTML = ''),
    filter(v=>v.trim()),
    switchMap(
        v => ajax.getJSON(url + v).pipe(
            catchError(err=> EMPTY)
        )
    ),
    map(response => response.items),
    mergeMap((items)=>items)
)

stream$.subscribe(user=>{
    console.log(user)
    const html = `
        <div class="card">
            <div class="card-image">
                <img src="${user.avatar_url}">
                <span class="card-title">${user.login}</span>
            </div>
            <div class="card-action">
                <a href="${user.html_url}" target="_blank">Открыть GitHub</a>
            </div>
        </div>
    `
    result.insertAdjacentHTML('beforeend', html)
});