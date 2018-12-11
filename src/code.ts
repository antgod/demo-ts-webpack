import {Observable} from 'rxjs';

const source$ = new Observable(o => {
    o.next('hello world!!');
    o.next('hello dottie!!');
});

const o = source$.subscribe(console.log);