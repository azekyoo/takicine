import {Component, OnInit} from '@angular/core';
import {Movie} from '../../models/movie.model';
import {MovieService} from '../../services/movie.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ExportCsvService} from '../../services/exportCsv.service';
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-list-films',
  templateUrl: './list-movies.component.html',
  imports: [
    RouterLink,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./list-movies.component.css']
})
export class ListFilmsComponent implements OnInit {

    movies: Movie[];
    id: number;

    constructor(private filmService: MovieService,
                private router: Router, private route: ActivatedRoute,
                private exportCsvService: ExportCsvService) {
    }

    ngOnInit() {
        this.filmService.getMovies().subscribe(movies => this.movies = movies);
        this.id = +this.route.snapshot.paramMap.get('id');
    }

    deleteFilm(id: number) {
        this.filmService.deleteMovie(id).subscribe(succes => {
            this.movies = this.movies.filter(film => film.id !== id)
        });
    }

    redirectAddFile(id: number) {
        this.router.navigateByUrl('/add-file/' + id);
    }

    updateMovie(id: number) {
        this.router.navigateByUrl('/add-film/' + id);
    }

    downloadFile() {
        this.exportCsvService.downloadFile(this.movies)
    }

}
