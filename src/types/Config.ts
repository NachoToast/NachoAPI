export interface Config {
    /** Port the API will listen on. */
    port?: number;

    /** 'RateLimit-Bypass-Token' request header values. */
    adminTokens?: string[];

    /** You can disable modules individually by changing the `disabled` key to true. */
    modules: {
        /**
         * Spotify module of the API, used for Client Credentials OAuth flow on
         * any NachoToast applications that involve Spotify.
         */
        spotify: {
            disabled: boolean;
            clientId: string;
            clientSecret: string;
        };

        discord: {
            disabled: boolean;
            clientId: string;
            clientSecret: string;
            redirectURI: string;
        };
    };
}
