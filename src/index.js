import { fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const url = 'https://api.github.com/search/users?q=';

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input').pipe(
    map(v=>v.target.value),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(
        v => ajax.getJSON(url + v)
    ),
    map(response => response.items)
)

stream$.subscribe(v=>console.log(v));