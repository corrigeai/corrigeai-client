import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { EssayService } from '../services/essay.service';
import { Essay } from '../../models/essay';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isUndefined} from "util";


@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.scss']
})
export class EssayComponent implements OnInit {
    essay: Essay = new Essay('','','','','');
    id: string;
    imagePath;
    text;


    constructor(private essayService: EssayService,
      private router: Router,
      private _sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.essayService.receiveToReview().subscribe(
            (res) => {
              let essay = res.essay;
              this.essay = essay;
              this.id = res.reviewId;
              if(essay.type == "Image"){
                this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(essay.content);
              }
              else {
                this.text = res.essay.content;
              }

            });
    }

    onReviewEssay() {
      if(!isUndefined(this.id)) {
        this.router.navigate(['/review', this.id]);
      }
    }
}
