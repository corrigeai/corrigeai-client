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
  userEssays :Essay[] = [
    new Essay(
      'A queda de Dom Quixote',
    'Emo Vibes',
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum")
  ];

  constructor(private essayService: EssayService) { }

  ngOnInit() {
    for(let i = 0; i < 20; i++){
      this.userEssays.push(
        new Essay(
          'A queda de Dom Quixote',
        'Emo Vibes',
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum")
      );
    }
  }

  onNewEssay() {
    this.essayService.createEssay();
  }

}

