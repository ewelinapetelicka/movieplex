export interface Teaser {
    "id": number,
    "poster": string,
    "title": string,
    "director": string,
    "studio": string,
    "genre": string[],
    production: string,
    releaseDate: Date,
    cast: string[],
    teaserReleaseDate: Date;
    earlyRating: number;
}

export interface TeaserDTO extends Omit<Teaser, 'id' | 'poster'> {
}