import { APIGuild, APIGuildMember, APIUser } from 'discord-api-types/v9';

export interface Application {
    user: APIGuildMember & { user: APIUser };
    reporter: APIGuildMember & { user: APIUser };
    guild: APIGuild;
    voteStatus: {
        for: number;
        against: number;
    };
}
