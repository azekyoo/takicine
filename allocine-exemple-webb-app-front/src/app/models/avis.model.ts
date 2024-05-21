import { defaultsDeep } from 'lodash';
import {User} from './user.model';
import {Movie} from './movie.model';

export class Review {
    id: number;
    rate: number;
    reviewDate: Date;
    text: string;
    user: User;
    movie: Movie;

    constructor(avis?: Partial<Review>) {
        defaultsDeep(this, avis);
    }
}
