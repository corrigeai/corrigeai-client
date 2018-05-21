import { Component, OnInit, Input } from '@angular/core';
import { EssayService } from '../services/essay.service';
import { Essay } from '../models/essay';

@Component({
  selector: 'app-essay-card',
  templateUrl: './essay-card.component.html',
  styleUrls: ['./essay-card.component.scss']
})
export class EssayCardComponent implements OnInit {
    @Input() essay: Essay;

    constructor(private essayService: EssayService) {}

    ngOnInit() {
      console.log("I guess the card exists");
    }

    onEditEssay() {
      this.essayService.essayEdited.emit(this.essay);
    }

}