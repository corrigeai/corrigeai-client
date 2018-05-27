import { Component, OnInit, Input } from '@angular/core';
import { EssayService } from '../services/essay.service';
import { Essay } from '../models/essay';

@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.scss']
})
export class EssayComponent implements OnInit {
    @Input() essay: Essay;

    constructor(private essayService: EssayService) {}

    ngOnInit() {
        this.essayService.getUserEssays().subscribe(
            (essays) => {
                console.log(essays[0]);
              this.essayService.setEssayCollection(essays);
              this.essay = this.essayService.getEssayCollection()[0];
              console.log( this.essayService.getEssayCollection());
            });
    }

    onReviewEssay() {
      this.essayService.essayEdited.emit(this.essay);
    }

}