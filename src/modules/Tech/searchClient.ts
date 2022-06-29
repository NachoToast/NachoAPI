import axios from 'axios';
import { writeFileSync } from 'fs';
import { HTMLElement, parse } from 'node-html-parser';
import { join } from 'path';
import { Monitor, MonitorSpecs } from './@types/PBTech';

export enum ClientStatus {
    MakingSession,
    Searching,
    GotResults,
    Errored,
}

/** Scrapes PBTech web for monitors. */
export class SearchClient {
    public readonly endpoint: string;

    private _sessionId?: string;
    private _status: ClientStatus = ClientStatus.MakingSession;

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.makeSession().then(() => {
            this._status = ClientStatus.Searching;
            this.run();
        });
    }

    public get status(): ClientStatus {
        return this._status;
    }

    /**
     * Makes a PBTech web browsing session.
     * @param {boolean} [force=false] Whether to make a new session if one already exists, defaults to false.
     * @returns {String} The session ID, including the starting `PHPSESSID=...`
     * @example "PHPSESSID=ABC123"
     */
    private async makeSession(force: boolean = false): Promise<string> {
        if (!force && this._sessionId) return this._sessionId;

        const res = await axios.post('https://www.pbtech.co.nz/code/toggle_hide_out_of_stock_pdo.php');

        this._sessionId = res.headers['set-cookie']![0].split('; ')[0];
        return this._sessionId;
    }

    private async run(): Promise<void> {
        const res = await axios.get(this.endpoint, {
            headers: {
                cookie: `recordnumber=999999; view_as=Expanded%20List; ${await this.makeSession()}`,
            },
        });
        const data = parse(res.data);

        const items = data
            .querySelectorAll('a.js-product-link.item_line_name')
            .filter((_, i) => i % 2 === 0)
            .map((e) => {
                return {
                    href: e.getAttribute('href')!,
                    title: e.getAttribute('title')!,
                    code: e.getAttribute('data-product-code')!,
                };
            });

        console.log(`Found ${items.length} items, searching...`);

        const allData: Monitor[] = await Promise.all(
            items.map(async (e) => {
                return {
                    title: e.title,
                    href: e.href,
                    id: e.code,
                    specs: await SearchClient.parseItem(e.href),
                };
            }),
        );

        // const uniqueKeys: Record<string, number> = {};
        // allData.forEach((e) => {
        //     Object.keys(e).forEach((k) => {
        //         if (uniqueKeys[k] === undefined) uniqueKeys[k] = 1;
        //         else uniqueKeys[k]++;
        //     });
        // });

        writeFileSync(join(__dirname, 'monitors.json'), JSON.stringify(allData, undefined, 4), 'utf-8');

        // console.log(
        //     Object.keys(uniqueKeys)
        //         .sort((a, b) => uniqueKeys[a] - uniqueKeys[b])
        //         .map((e) => `${e}: ${uniqueKeys[e]}`)
        //         .join('\n'),
        // );
    }

    private static async parseItem(href: string): Promise<MonitorSpecs> {
        const output: MonitorSpecs = { _UNKNOWN: {} };

        const res = await axios.get(`https://www.pbtech.co.nz/${href}`);
        const data = parse(res.data);

        const children = data
            .querySelector('div#featuresSpecs')!
            .childNodes.filter((e) => e instanceof HTMLElement) as HTMLElement[];

        let currentBlockName = '_UNKNOWN';

        for (let i = 0, len = children.length; i < len; i++) {
            const child = children[i];
            // start of a new block
            if (child.classList.contains('heading_')) {
                currentBlockName = child.innerText.replaceAll('&nbsp;', '');
                output[currentBlockName] = {};
            } else if (child.classList.contains('label_')) {
                const key = child.innerText.replaceAll('&nbsp;', '');
                const value = children[++i].innerText.replaceAll('&nbsp;', ' ');
                output[currentBlockName][key] = value;
            }
        }

        return output;
    }
}
