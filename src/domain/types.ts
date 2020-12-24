export type Flags = {
    [key in FlagsKeys]: boolean
}

export enum FlagsKeys {
    Texts = 'texts',
    Ikons = 'ikons',
    Instructions = 'instructions',
    Saints = 'saints'
}
