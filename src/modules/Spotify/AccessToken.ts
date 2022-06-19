export interface AccessToken {
    access_token: string;
    token_type: 'Bearer';

    /** Starts at 3600. */
    expires_in: number;

    refresh_token: string;
    scope: string;
}
