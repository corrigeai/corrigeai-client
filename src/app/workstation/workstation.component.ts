import { Component, OnInit } from '@angular/core';
import { EssayService } from '../services/essay.service';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss']
})
export class WorkstationComponent implements OnInit {

  constructor(private essayService: EssayService) { }

  ngOnInit() {
  }

  onNewEssay() {
    console.log("Button works at least");
    this.essayService.createEssay();

  }

}
