import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie.model';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {Review} from '../../models/avis.model';
import {ReviewService} from '../../services/review.service';
import {RouterLink} from "@angular/router";
import {ChartsComponent} from "../charts/charts.component";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  imports: [
    RouterLink,
    ChartsComponent,
    NgIf,
    NgOptimizedImage
  ],
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {
    movies: Movie[];
    users: User[];
    reviews: Review[];
    average: number;

    constructor(private filmService: MovieService, private userService: UserService, private reviewService: ReviewService) {
    }

    ngOnInit(): void {
        this.filmService.getMovies().subscribe(films => this.movies = films);
        this.userService.getUsers().subscribe(users => this.users = users);
        this.reviewService.getReviews().subscribe(reviews => this.reviews = reviews);
        this.filmService.getAverageFilms().subscribe(average => this.average = average);
    console.log(this.average)
    }

}
