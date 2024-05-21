import {Component, OnInit} from '@angular/core';
import {FilmCreateDto, MovieService} from '../../services/movie.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Movie} from '../../models/movie.model';

@Component({
  standalone: true,
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {

    constructor(private filmService: MovieService, private route: ActivatedRoute, private router: Router) {
    }

    selectedFile: File;
    id: string;
    movie: Movie

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id')
        this.filmService.getMovieById(parseInt(this.id, 10)).subscribe(f => {
            this.movie = f
        })
    }

    public onFileChanged(event) {
        // Select File
        this.selectedFile = event.target.files.item(0);
    }

    public onUpload() {
        const filmCreateDto: FilmCreateDto = {
            id: this.id,
            filmImage: this.selectedFile
        }

        this.filmService.addFile(filmCreateDto).subscribe(f => console.log(filmCreateDto));
        this.router.navigateByUrl('/list-films');
    }

    public onDelete() {
        this.filmService.deleteFile(this.id).subscribe(succes => {
            console.log('delete')
        })
        setTimeout(() => {
            this.router.navigateByUrl('/list-films')
        }, 1000);
    }

}
