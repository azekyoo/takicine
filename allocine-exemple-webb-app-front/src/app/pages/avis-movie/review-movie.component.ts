import {Component, OnInit} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {Review} from '../../models/avis.model';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../models/movie.model';
import {MovieService} from '../../services/movie.service';
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-review-film',
  standalone: true,
  templateUrl: './review-movie.component.html',
  imports: [
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./review-movie.component.css']
})
export class ReviewMovieComponent implements OnInit {
    reviews: Review[];
    movies: Movie[];
    id: string

    constructor(private reviewService: ReviewService,
                private filmService: MovieService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.filmService.getReviewByFilm(this.id).subscribe(reviews => this.reviews = reviews);
        this.filmService.getMovies().subscribe(movie => this.movies = movie);
    }

}
