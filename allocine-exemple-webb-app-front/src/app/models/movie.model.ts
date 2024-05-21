import { defaultsDeep } from 'lodash';

export class Movie {
    id: number;
    title: string;
    releaseDate: Date;
    director: string;
    rate: number;
    synopsis: string;
    image: string;

    constructor(movie?: Partial<Movie>) {
        defaultsDeep(this, movie);
    }
}
