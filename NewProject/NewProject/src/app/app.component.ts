import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { TitleCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MovieComponent } from './home/movie/movie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TitleCasePipe, HomeComponent, DatePipe, AsyncPipe, MovieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TakiCiné';
}
