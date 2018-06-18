import { Component } from "@angular/core";

@Component({
    selector: 'app-rate-review',
    templateUrl: './rate-review.component.html',
    styleUrls: ['./rate-review.component.scss']
})
export class RateReviewComponent {
    active: number = 1;

    myFunction() {
        this.active = this.active * -1  ;
        console.log(this.active);
    }
}