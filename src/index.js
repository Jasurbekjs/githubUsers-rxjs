import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

const url = 'https://api.github.com/search/users?q=';

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input').pipe(
    map(v=>v.target.value),
)

stream$.subscribe(v=>console.log(v));