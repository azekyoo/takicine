import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie.model';
import {defaultsDeep } from 'lodash';
import {DatePipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-add-film',
  templateUrl: './add-movie.component.html',
  imports: [
    RouterLink,
    FormsModule,
    DatePipe
  ],
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

    constructor(private filmService: MovieService, private route: ActivatedRoute, private router: Router) {
    }

    id: string;
    onAddPage: boolean;
    film: Movie
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id')
        this.onAddPage = !this.id
        if(this.onAddPage){
            this.film = new Movie()
        }
        else {
            this.filmService.getMovieById( parseInt(this.id,10 )).subscribe(f => {this.film = f
            console.log(this.film)})
        }
    }
    onSubmit(ngForm: NgForm) {
        if(this.onAddPage) {
            const film = defaultsDeep({
                id: null,
                title: ngForm.form.value.title,
                director: ngForm.form.value.director,
                releaseDate: ngForm.form.value.releaseDate,
                synopsis: ngForm.form.value.synopsis,
            });
            this.filmService.addMovie(film).subscribe(f => console.log(film));
        }
        else {
            const film = defaultsDeep({
                id: this.film.id,
                title: ngForm.form.value.title,
                director: ngForm.form.value.director,
                releaseDate: ngForm.form.value.releaseDate,
                synopsis: ngForm.form.value.synopsis,
            });
            this.filmService.updateMovie(film).subscribe(f => console.log(film));
        }
         setTimeout(() => {
         this.router.navigateByUrl('/list-films')
         }, 1000);
    }


}


