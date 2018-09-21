import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { EssayService } from '../services/essay.service';
import { Essay } from '../../models/essay';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss']
})
export class WorkstationComponent implements OnInit {
  userEssays: Essay[] = [];

  constructor(private essayService: EssayService) {
  }

  ngOnInit() {
    this.essayService.getUserEssays().subscribe(
      (essays) => {
        this.essayService.setEssayCollection(essays);
        this.userEssays = this.essayService.getEssayCollection();
      });
    this.essayService.essayDeleted
      .subscribe(() => {
        this.userEssays = this.essayService.getEssayCollection();
      });
  }

  onNewEssay() {
    this.essayService.notifyEssayCreation();
  }

}

