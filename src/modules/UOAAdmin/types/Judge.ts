import { APIGuild, APIUser } from 'discord-api-types/v9';

export interface Judge {
    user: APIUser;
    oversees: APIGuild;
}
