export type childrenType = {
    path?: string,
    value: unknown;
    children?: childrenType[];
    noShowingChildren?: boolean;
    meta?: {
        showParent?: Boolean;
        icon?: string,
        title?: string
    }
}