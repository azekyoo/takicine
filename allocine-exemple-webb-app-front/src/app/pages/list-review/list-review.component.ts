import {Component, OnInit} from '@angular/core';
import {Review} from '../../models/avis.model';
import {ReviewService} from '../../services/review.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ExportCsvService} from '../../services/exportCsv.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  standalone: true,
  selector: 'app-list-avis',
  templateUrl: './list-review.component.html',
  imports: [
    DatePipe,
    FormsModule,
    RouterLink,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {
    reviews: Review[];
    idUser: string
    onAdminPage: boolean;
    years: number[];
    yearSelected: string;
    constructor(private avisService: ReviewService, private router: Router,
                private route: ActivatedRoute, private exportCsvService: ExportCsvService, private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.avisService.findAllyears().subscribe(y => this.years = y)
        this.idUser = this.route.snapshot.paramMap.get('idUser')
        this.onAdminPage = !this.idUser
        if (this.onAdminPage) {
            this.avisService.getReviews().subscribe(reviews => {
                this.reviews = reviews
            });
        } else {
            this.userService.getReviewByUserId(this.idUser).subscribe(avisList => this.reviews = avisList);
        }
    }

    deleteAvis(id: number) {
        this.avisService.deleteReview(id).subscribe(succes => {
            this.reviews = this.reviews.filter(avis => avis.id !== id)
        });
    }

    updateAvis(id: number) {
        this.router.navigateByUrl('/add-avis/' + id);
    }

    downloadFile() {
        this.exportCsvService.downloadFile(this.reviews)
    }

    valueSelectedChange(newValueYear) {
        this.yearSelected = newValueYear;
        this.avisService.findReviewByYear(newValueYear).subscribe(a => this.reviews = a)

    }

}
