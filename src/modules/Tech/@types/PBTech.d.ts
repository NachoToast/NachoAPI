export interface Monitor {
    title: string;
    id: string;
    href: string;
    specs: MonitorSpecs;
}

export interface MonitorSpecs {
    [k: string]: Record<string, string>;
}
