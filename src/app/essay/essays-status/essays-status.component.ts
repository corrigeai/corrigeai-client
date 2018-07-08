import { Component, OnInit } from "@angular/core";
import { ReviewService } from "../../services/review.service";

import swal from 'sweetalert2';
import {isUndefined} from "util";
import { Router } from "@angular/router";

@Component({
    selector: 'app-essays-status',
    templateUrl: './essays-status.component.html',
    styleUrls: ['./essays-status.component.scss']
})
export class EssaysStatusComponent  implements OnInit {
    reviewsAboutUser;    

    constructor(private router: Router,
        private reviewService: ReviewService) {}

    ngOnInit() {
        this.reviewService.getReviewsAboutUser()
        .subscribe(
            (reviews) => {
                this.reviewsAboutUser = reviews;
                this.reviewService
                .setReviewCollection(
                    reviews.map(function(item) {return item.review}))
            }
        );
    }

    sum(numList: number[]) {
        return numList.reduce(function(a, b) { return a + b; });
    }

    displayReview(review: any) {
        if(!isUndefined(review.id)) {
            this.router.navigate(['/prev-review', review.id]);
          }
    }
}