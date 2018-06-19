import { Component, OnInit } from "@angular/core";
import { ReviewService } from "../../services/review.service";

import swal from 'sweetalert2';

@Component({
    selector: 'app-essays-status',
    templateUrl: './essays-status.component.html',
    styleUrls: ['./essays-status.component.scss']
})
export class EssaysStatusComponent  implements OnInit {
    reviewsAboutUser = [{
        review: {
        id:"",
        essayId:"",
        comments:['','',' ','',''],
        ratings:[0,0,0,0,0]},
        essay: {
            title:"dasdasdsa"
        }
    
    }];    

    constructor(private reviewService: ReviewService) {}

    ngOnInit() {
        this.reviewService.getReviewsAboutUser()
        .subscribe(
            (reviews) => {
                this.reviewsAboutUser = reviews;
            }
        );
    }

    sum(numList: number[]) {
        return numList.reduce(function(a, b) { return a + b; });
    }

    displayReview(review: any) {
        this.reviewService.ratingDisplayed.emit(review);
    }
}