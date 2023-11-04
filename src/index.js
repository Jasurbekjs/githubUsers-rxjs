import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'

const url = 'https://api.github.com/search/users?q=';

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input').pipe(
    map(v=>v.target.value),
    debounceTime(500)
)

stream$.subscribe(v=>console.log(v));