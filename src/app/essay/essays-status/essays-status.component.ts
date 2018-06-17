import { Component, OnInit } from "@angular/core";
import { ReviewService } from "../../services/review.service";

@Component({
    selector: 'app-essays-status',
    templateUrl: './essays-status.component.html',
    styleUrls: ['./essays-status.component.scss']
})
export class EssaysStatusComponent  implements OnInit {
    reviewsAboutUser; 

    constructor(private reviewService: ReviewService) {}

    ngOnInit() {
        this.reviewService.getReviewsAboutUser()
        .subscribe(
            (reviews) => {
                this.reviewsAboutUser = reviews;
            }
        );
    }
}