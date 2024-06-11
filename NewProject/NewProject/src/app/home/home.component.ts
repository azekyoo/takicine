import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { inject } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, AsyncPipe, MovieComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  
  private readonly moviesService = inject(MoviesService)

  movies$: Observable<Movie[]> = this.moviesService.getMovies()
}
