import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie.model';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    constructor(private filmService: MovieService, private router: Router) {
    }

    movies: Movie[];

    ngOnInit(): void {
        this.filmService.getMovies().subscribe(movies => this.movies = movies);
    }

    redirectFilmAvis(id: number) {
        this.router.navigateByUrl('/avis-film/' + id);
    }
}


