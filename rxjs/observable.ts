import { asapScheduler, asyncScheduler, count, from, fromEventPattern, map, Observable, observeOn, scheduled, takeUntil, toArray, fromEvent, Subscriber } from 'rxjs'
import { createReadStream } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { createInterface } from 'readline'
import { getReadline } from './util';

const fileObservable = new Observable((subscriber) => {
    const stream = createReadStream(join(__dirname, 'input', 'day1.txt'));
    setTimeout(() => {
        stream.close();
        stream.push(null);
        stream.read(0);
    }, 1000)
    const rl = createInterface({
        input: stream,
        // Note we use the crlfDelay option to recognize all instances of CR LF
        // (`\r\n`) in input.txt as a single line break
        crlfDelay: Infinity,
    });
    rl.on('line', (line) => subscriber.next(line));
    rl.on('close', () => subscriber.complete())
});


// count the number of times the number increases in the file
fileObservable.pipe(
    observeOn(asapScheduler),
    map((value => Number(value))),
    toArray(),
    map(array => {
        scheduled(array, asyncScheduler).pipe(
            count((value: number, i: number) => i > 0 && value > array[i - 1])
        ).subscribe(result => console.log('Result ', result))
    })
).subscribe();

// taking from custom event handler
const rl = getReadline('day1.txt');
scheduled(
    fromEventPattern(
        handler => rl.addListener('line', handler),
        handler => rl.removeListener('line', handler)
    ), asyncScheduler
).pipe(
    takeUntil(fromEvent(rl, 'close')),
    map(value => Number(value)),
    toArray(),
    map((allNumbersArray) => {
        scheduled(allNumbersArray, asyncScheduler)
            .pipe(
                count((value: number, i: number) => i > 0 && value > allNumbersArray[i - 1]),
            ).subscribe(result => console.log(`Result `, result));
    })
).subscribe();
