import { Component, Input, OnInit } from "@angular/core";
import { Review } from "../../models/review";
import { ReviewService } from "../services/review.service";


@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    display = 'none';
    @Input() review: Review = new Review("","",['','',' ','',''],[0,0,0,0,0]);

    constructor(private  reviewService: ReviewService) {
    }

    ngOnInit() {
        this.reviewService.reviewDisplayed
        .subscribe(
            (content) => {
                this.display = 'block';
                this.review = content;
            }
        )
    }
    
    onCloseReview() {
        this.display = 'none';
    }

    onRateReview() {
        // TODO
    }
}