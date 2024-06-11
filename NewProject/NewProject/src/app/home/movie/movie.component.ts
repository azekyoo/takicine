import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input({required: true}) movie!: Movie
}
