import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Review} from '../models/avis.model';


@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    getReviews(): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.url}/reviews`).pipe(timeout(10000));
    }

    addReview(review: Review): Observable<Review> {
        return this.http.post<any>(`${this.url}/reviews`, review).pipe(timeout(10000));
    }

    findNbReviewByYear(year: string): Observable<number[]> {
        return this.http.get<number[]>(`${this.url}/reviews/byYear/${year}/quantity`).pipe(timeout(10000));
    }

    findReviewByYear(year: string): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.url}/reviews/byYear/${year}`).pipe(timeout(10000));
    }

    updateReview(review: Review): Observable<Review> {
        return this.http.put<any>(`${this.url}/reviews/${review.id}`, review).pipe(timeout(10000));
    }

    getReviewById(id: number): Observable<Review> {
        return this.http.get<Review>(`${this.url}/reviews/${id}`).pipe(timeout(10000));
    }

    deleteReview(id: number): Observable<any> {
        return this.http.delete(`${this.url}/reviews/${id}`).pipe(timeout(10000));
    }

    checkAddReview(checkAvis: checkReviewValide): Observable<boolean> {
        return this.http.get<boolean>(`${this.url}/reviews/checkAvis`, {params: {...checkAvis}}).pipe(timeout(10000));
    }

    findAllyears(): Observable<number[]> {
        return this.http.get<number[]>(`${this.url}/reviews/findAllYears`).pipe(timeout(10000));
    }
}

export type checkReviewValide = {
    userId: string,
    filmId: string
};
