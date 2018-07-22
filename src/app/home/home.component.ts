import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from '../services/topic.service';
import { RatingService } from '../services/rating.service';
import { ReviewService } from '../services/review.service';
import { EssayService } from '../services/essay.service';
import { BadgesService } from '../services/badges.service';
import { UserService } from '../services/user.service';
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
    isInTopic: Boolean;

    ratingApprove: number;
    ratingDesapprove: number;
    approvePercent: string;
    desapprovePercent: string;

    createdEssays: number;
    reviewedEssays: number;

    hasRatings: boolean;
    ratings: Rating[] = [];
    essayTitles: String[] = [];

    constructor(
        private topicService: TopicService,
        private ratingService: RatingService,
        private reviewService: ReviewService,
        private badgeService: BadgesService,
        private essayService: EssayService,
        private userService: UserService,
        private router: Router
    ) {
        this.description = "O CorrigeAí ajuda você a se conectar com outras pessoas e juntos se ajudarem na escrita de redações.";
        this.noTopicMessage = 'Em breve será lançado um tópico semanal';
    }

    ngOnInit() {
        this.topicService.getOpenTopic()
            .subscribe(res => {
                this.topic = res.theme;
                const user = JSON.parse(sessionStorage.getItem('currentUser'));
                this.isInTopic = user.usingWeekelyTopic;
            });

        this.badgeService.getBadgesByUserId().subscribe(
          (response) => {
            this.createdEssays = response.createdEssays;
            this.reviewedEssays = response.reviewedEssays;
          }
        );

        this.ratingService.getRatingsOfCurrentUser()
            .subscribe(res => {
                if (!res.length) {
                    this.hasRatings = false;
                } else {
                    this.hasRatings = true;
                    this.ratingApprove = res.filter(rating => rating.vote === 'Upvote').length;
                    this.ratingDesapprove = res.length - this.ratingApprove;

                    this.approvePercent = parseFloat(((this.ratingApprove / res.length) * 100) + '').toFixed(2);
                    this.desapprovePercent = parseFloat(((this.ratingDesapprove / res.length) * 100) + '').toFixed(2);
                    this.ratings = res;
                    console.log(res);
                    for (let i = 0; i < this.ratings.length; i++) {
                      this.ratingService.getEssayByReviewId(this.ratings[i].reviewId).subscribe(res2 => {
                        this.essayTitles[i] = res2.title;
                      });
                    }
                }
            });
    }

    getEssayTitle(rating) {
      this.ratingService.getEssayByReviewId(rating.reviewId).subscribe(res => {
        return res.title;
      });
    }

    joinTopic() {
      this.userService.subscribeToTopic().subscribe(
        (res) => {
          const user = JSON.parse(sessionStorage.getItem('currentUser'));
          this.isInTopic = true;
        }
      );
    }

    leaveTopic() {
      this.userService.unsubscribeToTopic().subscribe(
        (res) => {
          const user = JSON.parse(sessionStorage.getItem('currentUser'));
          this.isInTopic = false;
        }
      );
    }
}
