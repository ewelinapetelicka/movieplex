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
    ageRestriction: number | null;
    production: string;
    releaseDate: Date;
    cast: string[];
}

export interface FilmDTO extends Omit<Film, 'id' | 'poster' | 'trailer'> {
}