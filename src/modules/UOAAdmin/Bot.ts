import { Client, Intents } from 'discord.js';
import { Global } from '../../classes/Global';

export class Bot {
    public readonly client: Client<true>;
    public constructor() {
        this.client = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
        });

        this.client.login(Global.config.modules.uoaAdmin.discordToken);
    }
}
