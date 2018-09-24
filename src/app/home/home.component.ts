import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from '../services/topic.service';
import { RatingService } from '../services/rating.service';
import { BadgesService } from '../services/badges.service';
import { UserService } from '../services/user.service';
import { Rating } from '../../models/rating';
import { Pack } from '../../models/pack';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { User } from '../../models/user';

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

    packs: Pack[] = [];

    basicPack = 55;
    platinumPack = 100;
    buyPack: FormGroup;
    packageType: number; // Recommended package to buy

    user: User;

    constructor(
        private topicService: TopicService,
        private ratingService: RatingService,
        private badgeService: BadgesService,
        private userService: UserService,
        private router: Router,
        private paymentService: PaymentService,
        private formBuilder: FormBuilder,
    ) {
        this.description = 'O CorrigeAí ajuda você a se conectar com outras pessoas e juntos se ajudarem na escrita de redações.';
        this.noTopicMessage = 'Em breve será lançado um tópico semanal';
        this.buyPack = this.formBuilder.group({
          'plan': [this.platinumPack, []]
        });
    }

    ngOnInit() {
        this.paymentService.getPacks().subscribe(res => {
          this.packs = res;
          console.log(this.packs);
        });

        this.paymentService.packAdded
            .subscribe(newPack => {
              this.packs.push(newPack);
            });

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
                    for (let i = 0; i < this.ratings.length; i++) {
                      this.ratingService.getEssayByReviewId(this.ratings[i].reviewId).subscribe(res2 => {
                        this.essayTitles[i] = res2.title;
                      });
                    }
                }
            });
    }

    addPack() {
      const packValue = this.buyPack.controls['plan'].value;
      const type = packValue === this.basicPack ? 'Basic' : 'Platinum';
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));

      const data = {
        userId: this.user.id,
        packageType: type
      };

      this.paymentService.addPack(data)
        .subscribe(newPack => {
            this.paymentService.addPackElement(newPack);
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
