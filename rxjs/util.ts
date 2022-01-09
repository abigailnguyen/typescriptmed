
import { createReadStream } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { createInterface } from 'readline'
import { resolve } from 'path/posix';
import { rejects } from 'assert';

export const getReadline = (path: string) => {
    const stream = createReadStream(join(__dirname, 'input', path));
    const rl = createInterface({
        input: stream,
        crlfDelay: Infinity,
    });
    rl.addListener('close', () => { stream.destroy(); stream.close(); })
    return rl;
}

export const isForward = (v: string) => v.startsWith('forward');

export const isUp = (v: string) => v.startsWith('up');

export const isDown = (v: string) => v.startsWith('down');

const convertToNumber = (instruction: string, direction: string): Promise<number> => new Promise((resolve, reject) => {
    const step = Number(instruction.replace(direction, '').trim());
    if (Number.isNaN(step)) reject('Not a valid number');
    resolve(step);
});


export const factory = (v: string): Promise<number> => new Promise(
    resolve => {
        if (isForward(v)) resolve(convertToNumber(v, 'forward'));
        if (isUp(v)) resolve(convertToNumber(v, 'up'));
        if (isDown(v)) resolve(convertToNumber(v, 'down'));
    }
);
