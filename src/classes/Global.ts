/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from '../types/Config';
import { DuplicateLogBehaviour } from './Logger';

export abstract class Global {
    public static readonly config: Config = require(`../../config.json`);

    public static readonly devmode: boolean = process.argv.slice(2).includes(`--devmode`);

    public static readonly version: string = process.env.npm_package_version || require(`../../package.json`).version;

    public static readonly logBehaviour: DuplicateLogBehaviour = Global.devmode
        ? DuplicateLogBehaviour.Replace
        : DuplicateLogBehaviour.Append;
}
