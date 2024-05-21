import {Injectable} from '@angular/core';
import {Movie} from '../models/movie.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Review} from "../models/avis.model";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.url}/movies`).pipe(timeout(10000));
    }

    getAverageFilms(): Observable<number> {
        return this.http.get<number>(`${this.url}/movies/average`).pipe(timeout(10000));
    }

    addFile(filmCreateDto: FilmCreateDto): Observable<Movie> {
        const data = new FormData();
        data.append('filmImage', filmCreateDto.filmImage)
        return this.http.put<any>(`${this.url}/movies/${filmCreateDto.id}/image`, data).pipe(timeout(10000));
    }

    addMovie(movie: Movie): Observable<Movie> {
        return this.http.post<any>(`${this.url}/movies`, movie).pipe(timeout(10000));
    }

    updateMovie(movie: Movie): Observable<Movie> {
        return this.http.put<any>(`${this.url}/movies/${movie.id}`, movie).pipe(timeout(10000));
    }

    getMovieById(id: number): Observable<Movie> {
        return this.http.get<Movie>(`${this.url}/movies/${id}`).pipe(timeout(10000));
    }

    deleteMovie(id: number): Observable<any> {
        return this.http.delete(`${this.url}/movies/${id}`).pipe(timeout(10000));
    }

    deleteFile(id: string): Observable<any> {
        return this.http.delete<any>(`${this.url}/movies/${id}/image`).pipe(timeout(10000));
    }

    getMoviesByUserId(userId: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.url}/movies/byReviewer/${userId}`).pipe(timeout(10000));
    }

    getReviewByFilm(id: string): Observable<Review[]> {
      return this.http.get<Review[]>(`${this.url}/movies/${id}/reviews`).pipe(timeout(10000));
    }
}

export type FilmCreateDto = {
    id: string,
    filmImage: File,
};
