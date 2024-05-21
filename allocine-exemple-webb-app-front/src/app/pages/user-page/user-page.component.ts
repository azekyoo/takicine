import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie.model';
import {Review} from '../../models/avis.model';
import {Router} from '@angular/router';
import {ReviewService} from '../../services/review.service';
import {ConnectionService} from '../../services/connection.service';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

    constructor(private filmService: MovieService,
                private avisService: ReviewService,
                private userService: UserService,
                private connectionService: ConnectionService,
                private router: Router) {
    }

    films: Movie[];
    reviews: Review[]
    userId: string;
    user: User

    ngOnInit(): void {
        if (this.connectionService.user) {
            this.userService.getUserById(this.connectionService.user.id).subscribe(u => this.user = u)
            this.userId = this.connectionService.user.id.toString();
            this.filmService.getMoviesByUserId(this.userId).subscribe(films => this.films = films);
            this.userService.getReviewByUserId(this.userId).subscribe(avisList => this.reviews = avisList);
        } else {
            this.router.navigateByUrl('/connection')
        }
    }

    redirectReview(idUser: string) {
        this.router.navigateByUrl('/list-avis/' + idUser);
    }

    newReview() {
        this.router.navigateByUrl('/add-avis');
    }

    logout() {
        this.connectionService.user = null
        this.router.navigateByUrl('/');
    }

    redirectInfos() {
        this.router.navigateByUrl('/add-user/' + this.connectionService.user.id);
    }

}
