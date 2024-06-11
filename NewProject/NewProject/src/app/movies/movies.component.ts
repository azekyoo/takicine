import { Component } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { DatePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [DatePipe, AsyncPipe, CommonModule,RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

  private readonly moviesService = inject(MoviesService)

  movies$: Observable<Movie[]> = this.moviesService.getMovies()

  deleteMovie(id: number): void {
    this.moviesService.deleteMovie(id).subscribe(() => {
      this.movies$ = this.moviesService.getMovies();
    });
  }
}
