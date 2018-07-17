import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from '../services/topic.service';
import { RatingService } from '../services/rating.service';
import { ReviewService } from '../services/review.service';
import { Rating } from '../../models/rating';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    description: String;
    topic: String;
    noTopicMessage: String;

    ratingApprove: number;
    ratingDesapprove: number;
    approvePercent: number;
    desapprovePercent: number;

    hasRatings: boolean;
    ratings: Rating[] = [];

    constructor(
        private topicService: TopicService,
        private ratingService: RatingService,
        private reviewService: ReviewService,
        private router: Router
    ) {
        this.description = "O CorrigeAí ajuda você a se conectar com outras pessoas e juntos se ajudarem na escrita de redações.";
        this.noTopicMessage = 'Em breve será lançado um tópico semanal';
    }

    ngOnInit() {
        this.topicService.getOpenTopic()
            .subscribe(res => {
                this.topic = res.theme;
            });

        this.ratingService.getRatingsOfCurrentUser()
            .subscribe(res => {
                if (!res.length) {
                    this.hasRatings = false;
                } else {
                    this.hasRatings = true;
                    this.ratingApprove = res.filter(rating => rating.vote === 'Upvote').length;
                    this.ratingDesapprove = res.length - this.ratingApprove;

                    this.approvePercent = (this.ratingApprove / res.length) * 100;
                    this.desapprovePercent = (1 - this.approvePercent) * 100;
                    this.ratings = res;
                }
            });
    }


    getEssayOfRating(rating: Rating): String {
      console.log(rating);
      return this.reviewService.getEssayOfReview(rating.reviewId).title;
    }
}
