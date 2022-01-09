import { from, Subject, Observable, connectable, scheduled, asyncScheduler, count } from "rxjs";

// A new way
const arrayInput = [199, 200, 208, 210, 207, 240, 269, 260, 263]
const arrayObservable = from(arrayInput);
type inputTuple = [number, number]; // [value, index]

const iterator = arrayInput.entries();
const source = new Observable<inputTuple>((subscriber) => {
    let { value, done } = iterator.next();
    while (!done) {
        subscriber.next(value);
        const nextValue = iterator.next();
        value = nextValue.value;
        done = nextValue.done;
    }

    // subscriber.complete()
    return () => {
        // makes the observable no longer emit values if the observables emits an infinitely
        // and tells subscriber to unsubscribe
        subscriber.unsubscribe();
        console.log(`Unsubscribed`)
    }
});

const subject = new Subject<inputTuple>();
subject.subscribe(v => console.log(`subject `, v));
const observer = {
    next: (x: any) => console.log(`Observer got a next value: `, x),
    error: (error: any) => console.log('Observer got an error: ', error),
    complete: () => console.log('Observer received a complete notification')
}
subject.subscribe(observer)

const connectableObservable = connectable(source, {
    connector: () => subject,
});
const subscription = connectableObservable.connect();
subscription.unsubscribe();

const subscription2 = source.subscribe(observer);
subscription2.unsubscribe();

subject.next([0, 199]);
subject.next([1, 200]);
subject.complete();

//Other implementation
const observable = scheduled<number>(arrayInput, asyncScheduler)
const subject2 = new Subject();
subject2.pipe(
    count((value: any, i: number) => {
        return i !== 0 && Number(value) > arrayInput[i - 1];
    })
).subscribe(value => console.log(value));

observable.subscribe(subject2);
console.log(Number('-1_000'))
