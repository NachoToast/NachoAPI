export interface Config {
    /** Port the API will listen on. */
    port?: number;

    /** 'RateLimit-Bypass-Token' request header values. */
    adminTokens?: string[];

    /**
     * Number of proxies (such as Cloudflare, AWS ELB, or Nginx) to skip for ratelimiting functionality.
     *
     * For more information see the {@link https://www.npmjs.com/package/express-rate-limit#:~:text=Troubleshooting%20Proxy%20Issues Express Rate Limit docs}.
     */
    numProxies?: number;

    /** Firebase database URL. */
    databaseURL: string;

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

        uoaAdmin: {
            disabled: boolean;
            discordToken: string;
        };

        quotes: {
            disabled: boolean;
        };
    };
}
