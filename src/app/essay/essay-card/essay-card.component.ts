import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ReviewService } from '../../services/review.service';
import { EssayService } from '../../services/essay.service';
import { Review } from '../../../models/review';
import { Essay } from '../../../models/essay';

@Component({
  selector: 'app-essay-card',
  templateUrl: './essay-card.component.html',
  styleUrls: ['./essay-card.component.scss']
})
export class EssayCardComponent implements OnInit {
    @Input() essay: Essay;
    grade: number;
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
                    result.map(function(item) { return item.review; }));
                console.log(this.reviewService.getReviewCollection());
                console.log(this.essay.id);
                this.reviews = this.reviewService.getReviewsOfEssay(this.essay.id);
                this.calculateGrade();

            }
        );
    }

    private calculateGrade() {
      let sum = 0;
      for (let i = 0; i < this.reviews.length; i++) {
          const reviewGrade = (this.reviews[i].ratings[0] +
                               this.reviews[i].ratings[1] +
                               this.reviews[i].ratings[2] +
                               this.reviews[i].ratings[3] +
                               this.reviews[i].ratings[4]);

          sum += reviewGrade;
      }

      if (this.reviews.length > 0) {
        this.grade = sum / this.reviews.length;
      } else {
        this.grade = 0;
      }
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
      this.router.navigate(['/prev-review/'.concat(review.id)]);
    }
}
