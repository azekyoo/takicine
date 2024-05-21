import {Component, OnInit} from '@angular/core';
import {checkReviewValide, ReviewService} from '../../services/review.service';
import {ActivatedRoute, Router} from '@angular/router';
import {defaultsDeep} from 'lodash';
import {ConnectionService} from '../../services/connection.service';
import {Movie} from '../../models/movie.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Review} from '../../models/avis.model';
import {UserService} from '../../services/user.service';
import {PopupComponent} from '../popup/popup.component';
import {FormsModule, NgForm} from '@angular/forms';
import {MovieService} from '../../services/movie.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./add-review.component.css']
})

export class AddReviewComponent implements OnInit {
    movies: Movie[];
    noteSelected: number;
    movieSelected: Movie;
    id: string;
    onAddPage: boolean;
    review: Review
    userConnected = false
    addAvisValide: boolean

    constructor(
        private reviewService: ReviewService,
        private movieService: MovieService,
        private userService: UserService,
        private router: Router,
        private connectionService: ConnectionService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit(): void {
        if (this.connectionService.user) {
            this.userConnected = true
        }
        this.id = this.route.snapshot.paramMap.get('id')
        this.onAddPage = !this.id
        if (this.onAddPage) {
            this.review = new Review()
        } else {
            this.reviewService.getReviewById(parseInt(this.id, 10)).subscribe(a => {
                this.review = a
                this.movieSelected = a.movie
                this.noteSelected = a.rate
            })
        }
        this.connectionService.refreshUser().subscribe(u => console.log(u));
        this.movieService.getMovies().subscribe(movies => this.movies = movies);
    }

    onSubmit(ngForm: NgForm) {
      console.log('Début de la méthode onSubmit');
        if (this.onAddPage) {
            const checkAvis: checkReviewValide = {
                userId: this.connectionService.user.id.toString(),
                filmId: this.movieSelected.id.toString()
            }
            this.reviewService.checkAddReview(checkAvis).subscribe(bool => {
                this.addAvisValide = bool
                if (!this.addAvisValide) {
                  const avis = defaultsDeep({
                    id: null,
                    user: this.connectionService.user,
                    movie: this.movieSelected,
                    rate: this.noteSelected,
                    text: ngForm.form.value.texte,
                  });
                  this.reviewService.addReview(avis).subscribe(u => console.log(u));
                  this.connectionService.refreshUser().subscribe(u => console.log(u));
                  setTimeout(() => {
                  }, 1000);
                  if (this.connectionService.user.points >= 2 && this.addAvisValide) {
                    const modalRef = this.modalService.open(PopupComponent);
                    modalRef.componentInstance.name = this.connectionService.user.firstName;
                    this.userService.addUser(this.connectionService.user).subscribe(u => console.log(u));
                  }
                  this.redirectListAvisCo();
                }
            })
        } else {
            const avis = defaultsDeep({
                id: this.review.id,
                user: this.connectionService.user,
                film: this.movieSelected,
                note: this.noteSelected,
                texte: ngForm.form.value.texte,
            });
            this.reviewService.updateReview(avis).subscribe(f => console.log(avis));
            this.connectionService.refreshUser().subscribe(u => console.log(u));
            this.redirectListAvisCo();
        }
    }

    redirectListAvisCo() {
        setTimeout(() => {
            this.router.navigateByUrl('/list-avis/' + this.connectionService.user.id)
        }, 1000);
    }


}
