/** {@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response API Reference} */
export interface AccessTokenResponse {
    access_token: string;
    token_type: `Bearer`;
    /** Seconds until token expiration. */
    expires_in: number;
    refresh_token: string;
    scope: string;
}

/** {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level Verification level} for a guild. */
export enum VerificationLevels {
    /** Unrestricted. */
    NONE,

    /** Must have a verified email on account. */
    LOW,

    /** Must be registered on Discord for longer than 5 minutes. */
    MEDIUM,

    /** Must be a member of the server for longer than 10 minutes. */
    HIGH,

    /** Must have a verified phone number. */
    VERY_HIGH,
}

/** {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level NSFW level} for a guild. */
export enum NSFWLevels {
    DEFAULT,
    EXPLICIT,
    SAFE,
    AGE_RESTRICED,
}

/** {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-features Features} of a guild. */
export enum GuildFeatures {
    /** Guild has access to set an animated guild banner image. */
    ANIMATED_BANNER = `ANIMATED_BANNER`,

    /** Guild has access to set an animated guild icon. */
    ANIMATED_ICON = `ANIMATED_ICON`,

    /** Guild has access to set a guild banner image. */
    BANNER = `BANNER`,

    /** Guild has access to use commerce features (i.e. create store channels). */
    COMMERCE = `COMMERCE`,

    /** Guild can enable welcome screen, Membership Screening,
     * stage channels and discovery, and receives community updates. */
    COMMUNITY = `COMMUNITY`,

    /** Guild is able to be discovered in the directory. */
    DISCOVERABLE = `DISCOVERABLE`,

    /** Guild is able to be featured in the directory. */
    FEATURABLE = `FEATURABLE`,

    /** Guild has access to set an invite splash background. */
    INVITE_SPLASH = `INVITE_SPLASH`,

    /** Guild has enabled Membership Screening. */
    MEMBER_VERIFICATION_GATE_ENABLED = `MEMBER_VERIFICATION_GATE_ENABLED`,

    /** Guild has enabled monetization. */
    MONETIZATION_ENABLED = `MONETIZATION_ENABLED`,

    /** Guild has increased custom sticker slots. */
    MORE_STICKERS = `MORE_STICKERS`,

    /** Guild has access to create news channels. */
    NEWS = `NEWS`,

    /** Guild is partnered. */
    PARTNERED = `PARTNERED`,

    /** Guild can be previewed before joining via Membership Screening or the directory. */
    PREVIEW_ENABLED = `PREVIEW_ENABLED`,

    /** Guild has access to create private threads. */
    PRIVATE_THREADS = `PRIVATE_THREADS`,

    /** Guild is able to set role icons. */
    ROLE_ICONS = `ROLE_ICONS`,

    /** Guild has access to the seven day archive time for threads. */
    SEVEN_DAY_THREAD_ARCHIVE = `SEVEN_DAY_THREAD_ARCHIVE`,

    /** Guild has access to the three day archive time for threads. */
    THREE_DAY_THREAD_ARCHIVE = `THREE_DAY_THREAD_ARCHIVE`,

    /** Guild has enabled ticketed events. */
    TICKETED_EVENTS_ENABLED = `TICKETED_EVENTS_ENABLED`,

    /** Guild has access to set a vanity URL. */
    VANITY_URL = `VANITY_URL`,

    /** Guild is verified. */
    VERIFIED = `VERIFIED`,

    /** Guild has access to set 384kbps bitrate in voice (previously VIP voice servers). */
    VIP_REGIONS = `VIP_REGIONS`,

    /** Guild has enabled the welcome screen. */
    WELCOME_SCREEN_ENABLED = `WELCOME_SCREEN_ENABLED`,
}

/**
 * Partial guild, part of invite object.
 *
 * {@link https://discord.com/developers/docs/resources/guild#guild-object API Reference}
 */
export interface Guild {
    id: string;

    name: string;

    icon: string | null;

    splash: string | null;

    verification_level: VerificationLevels;

    features: GuildFeatures[];

    description: string | null;

    banner: string | null;

    vanity_url_code: string | null;

    /** Current number of server boosts. */
    premium_subscription_count: number;

    nsfw: boolean;

    nsfw_level: NSFWLevels;
}

/** Guild object returned by `/users/@me/guilds`, but NOT in an invite object. */
export interface PartialGuild {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    permissions: string;
    features: GuildFeatures[];
}

/**
 * Invite object.
 *
 * Assumes `with_counts` and `with_expiration` are both `true`.
 *
 * {@link https://discord.com/developers/docs/resources/invite#invite-object API Reference}
 */
export default interface Invite {
    /** The invite code (unique ID), e.g. 'https://discord.gg/abcdefg' has code 'abcdefg'. */
    code: string;

    guild?: Guild;

    channel: {
        id: string;
        name: string;
        /** @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} */
        type: number;
    } | null;

    inviter?: User;

    target_type: number;

    /** For voice channel stream invites, this user's stream will be displayed. */
    target_user?: User;

    /** Partial application object, irrelevant. */
    target_application?: unknown;

    /** Approximate number of online members. */
    approximate_presence_count: number;

    /** Approximate number of total members. */
    approximate_member_count: number;

    /** ISO6801 timestamp, is `null` if the invite never expires.
     *
     * @example '2022-04-07T03:52:22+00:00'
     */
    expires_at: string | null;
}

/**
 * Discord user.
 *
 * {@link https://discord.com/developers/docs/resources/user#user-object API Reference}
 */
export interface User {
    id: string;

    /** E.g. '1234' */
    discriminator: string;

    /** E.g. 'NachoToast'. */
    username: string;

    /** Avatar hash. */
    avatar: string | null;

    /** @see {@link https://discord.com/developers/docs/resources/user#user-object-user-flags} */
    public_flags: number;
}
