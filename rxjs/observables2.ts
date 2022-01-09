// import axios from 'axios';
import { Observable, catchError, Subject, fromEvent, lastValueFrom, asapScheduler } from 'rxjs';
import { filter, takeUntil, toArray, map, observeOn } from 'rxjs/operators';
import { factory, getReadline, isDown, isForward, isUp } from './util';

// new Observable(observer => {
//     axios
//         .get('https://adventofcode.com/2021/day/2/input')
//         .then((response: AxiosResponse<any>) => {
//             observer.next(response.data);
//             observer.complete();
//         })
//         .catch((e) => observer.error(e));
// }).pipe(
//     catchError(e => { throw new Error(e.message); })
// ) // needs to login or send an access token

const rl = getReadline('day2.txt');

const subject = new Subject();
const source = fromEvent(rl, 'line').pipe(takeUntil(fromEvent(rl, 'close')));

const obs1 = source
    .pipe(
        filter((v) => isForward(v as string)),
        map(v => factory(v as string)),
        toArray(),
        map(factoryPromises => Promise.all(factoryPromises).then(v => v.reduce((acc, value) => acc + value, 0)))
    ).subscribe();


// const obs2 = source.pipe(
//     observeOn(asapScheduler),
//     filter((v: string) => isUp(v) || isDown(v)),
//     map(v => factory(v)),
//     toArray(),
//     map(factoryPromises => )
// )
