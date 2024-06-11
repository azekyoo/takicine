import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Movie} from "../../models/movie";
import {FormsModule} from "@angular/forms";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent implements OnInit {
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: 0,
    image: undefined
  };

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if (id) {
      this.moviesService.getMovie(id).subscribe(movieFromBackend => {
        this.movie = movieFromBackend;
      });
    }
  }

  editMovie(): void {
    this.moviesService.editMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}