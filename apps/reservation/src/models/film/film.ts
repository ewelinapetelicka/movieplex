export interface Film {
    id: number;
    poster: string;
    trailer: string;
    title: string;
    director: string;
    studio: string
    description: string;
    genre: string[];
    duration: number;
    language: string;
    ageRestriction: number;
    production: string;
    releaseDate: string;
    cast: string[];
}