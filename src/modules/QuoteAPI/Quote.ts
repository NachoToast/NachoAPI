export interface Quote {
    id: string;
    quote: string;
    /** Discord user ID */
    by: string;
    timestamp: number;
    link?: string;
}
