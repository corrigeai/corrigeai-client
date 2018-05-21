import { Component, OnInit } from '@angular/core';
import { EssayService } from '../services/essay.service';
import { Essay } from '../models/essay';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss']
})
export class WorkstationComponent implements OnInit {
  // essay: Essay = new Essay('A queda de Dom Quixote','Emo Vibes', null);
  userEssays :Essay[];

  constructor(private essayService: EssayService) { }

  ngOnInit() {
    this.userEssays = this.essayService.userEssayList;

  }

  onNewEssay() {
    this.essayService.notifyEssayCreation();
  }

}

