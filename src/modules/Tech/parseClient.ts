import { readFileSync } from 'fs';
import { Monitor } from './@types/PBTech';

export class ParseClient {
    public readonly filename: string;

    public constructor(filename: string) {
        this.filename = filename;
        this.parse();
    }

    private async parse(): Promise<void> {
        const file = JSON.parse(readFileSync(this.filename, 'utf-8')) as Monitor[];

        const numItems = file.length;
        console.log(`${numItems} Items`);

        {
            // key counting
            // const keys: Record<string, number> = {};
            // for (const item of file) {
            //     for (const key in item.specs) {
            //         if (keys[key] === undefined) keys[key] = 1;
            //         else keys[key]++;
            //     }
            // }
            // const sortedKeys = Object.keys(keys).sort((a, b) => keys[a] - keys[b]);
            // console.log(
            //     sortedKeys.map((e) => `${e}: ${keys[e]} (${Math.floor(100 * (keys[e] / numItems))}%)`).join('\n'),
            // );
        }

        const aspectRatioSynonyms = new Set<string>('PICTURE_QUALITY');
    }
}
