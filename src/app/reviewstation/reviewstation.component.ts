import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

import { EssayService } from '../services/essay.service';
import { Essay } from '../../models/essay';

@Component({
  selector: 'app-reviewstation',
  templateUrl: './reviewstation.component.html',
  styleUrls: ['./reviewstation.component.scss']
})
export class ReviewStationComponent implements OnInit {
  essaysToReview: Essay[];

  constructor(private essayService: EssayService) {
  }

  ngOnInit() {
    this.essayService.getUserEssays().subscribe(
      (essays) => {
        this.essayService.setEssayCollection(essays);
        this.essaysToReview = this.essayService.getEssayCollection();
      });
  }

  onNewEssay() {
    this.essayService.notifyEssayCreation();
  }

}

