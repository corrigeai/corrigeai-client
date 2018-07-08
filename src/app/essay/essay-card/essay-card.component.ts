import { Component, OnInit, Input } from '@angular/core';
import { EssayService } from '../../services/essay.service';
import { Essay } from '../../../models/essay';
import { Review } from '../../../models/review';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-essay-card',
  templateUrl: './essay-card.component.html',
  styleUrls: ['./essay-card.component.scss']
})
export class EssayCardComponent implements OnInit {
    @Input() essay: Essay;
    reviews: Review[] = [];
    display = false;

    constructor(private essayService: EssayService,
                private reviewService: ReviewService,
                private router: Router) {}

    ngOnInit() {
      this.reviewService.getReviewsAboutUser()
        .subscribe(
            (result) => {
                this.reviewService.setReviewCollection(
                    result.map(function(item) {return item.review}));
                console.log(this.reviewService.getReviewCollection());
                console.log(this.essay.id);
                this.reviews = this.reviewService.getReviewsOfEssay(this.essay.id);
            }
        );
    }

    onEditEssay() {
      this.essayService.essayEdited.emit(this.essay);
    }

    openDeleteEssay() {
       this.display = true;
    }

    refreshDisplay(event) {
      this.display = event.value;
    }

    onDeleteEssay(event) {
      this.essayService.deleteEssay(this.essay.id)
        .subscribe(() => {
          this.essayService.notifyEssayDeletion(this.essay);
        });
    }

    onReviewDetailsClicked(review) {
      console.log(review);
      this.router.navigate(['/prev-review/'.concat(review.id)]);
    }
}
