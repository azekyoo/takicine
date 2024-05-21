import {Component, OnInit} from '@angular/core';


import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie.model';
import {Chart, registerables} from 'chart.js';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewService} from '../../services/review.service';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";


@Component({
  standalone: true,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

    constructor(private filmService: MovieService, private avisService: ReviewService, private router: Router, private route: ActivatedRoute) {
        Chart.register(...registerables);
    }

    films: Movie[];
    canvas: any;
    chart: Chart;
    chart2: Chart;
    years: number[];
    yearSelected: string;

    ngOnInit(): void {

        this.avisService.findAllyears().subscribe(y => this.years = y)
        this.yearSelected = '2021'

        this.filmService.getMovies().subscribe(movies => {
            const ids = movies.map(movie => movie.title);
            const rates = movies.map(movie => movie.rate);

            this.chart = new Chart('canvas0', {
                type: 'line',
                data: {
                    labels: ids,
                    datasets: [
                        {
                            data: rates,
                            borderColor: '#FECC00',
                        },
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Note par film'
                        },
                        legend: {display: false},
                    }
                }
            });
        });
        this.avisService.findNbReviewByYear(this.yearSelected).subscribe(nbAvisMois => {
            const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre'];
            this.chart2 = new Chart('canvas1', {
                type: 'bar',
                data: {
                    labels: mois,
                    datasets: [
                        {
                            data: nbAvisMois,
                            borderColor: '#FECC00',
                            backgroundColor: 'rgba(254,204,0,0.51)',
                        },
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Nombre d\'avis par année'
                        },
                        legend: {display: false},
                    }
                }
            })
        })
    }

    valueSelectedChange(newValueYear) {
        this.yearSelected = newValueYear;
        this.avisService.findNbReviewByYear(newValueYear).subscribe(nbAvisMois => {
            if (this.chart2) this.chart2.destroy();
            const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre'];

            this.chart2 = new Chart('canvas1', {
                type: 'bar',
                data: {
                    labels: mois,
                    datasets: [
                        {
                            borderColor: '#FECC00',
                            backgroundColor: 'rgba(254,204,0,0.51)',
                            data: nbAvisMois,
                        },
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Nombre d\'avis par année'
                        },
                        legend: {display: false},
                    }
                }
            })
        })
    }


}
