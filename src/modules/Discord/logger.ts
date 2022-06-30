import { Global } from '../../classes/Global';
import { Logger } from '../../classes/Logger';

export const discordErrorLogger = new Logger(`modules/discord/errors.log`, Global.logBehaviour, Global.devmode);
export const discordInfoLogger = new Logger(`modules/discord/info.log`, Global.logBehaviour, Global.devmode);
