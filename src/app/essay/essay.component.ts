import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { EssayService } from '../services/essay.service';
import { Essay } from '../models/essay';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.scss']
})
export class EssayComponent implements OnInit, OnDestroy {
    essay: Essay = new Essay('','','','','');
    id: Subject<string> = new BehaviorSubject<string>(null);
    imagePath;


    constructor(private essayService: EssayService,
      private router: Router,
      private _sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.essayService.receiveToReview().subscribe(
            (essay) => { 
              this.essay = essay;
              this.id.next(essay.id);
              if(essay.type == "Image"){
                this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(essay.content);
              }
            });
    }

    onReviewEssay() {
      this.id.subscribe(
        (id) => {
          this.router.navigate(['/review', id]);
        }
      );
    }

    ngOnDestroy() {
      this.id.unsubscribe();
    }
}
