import { Component, OnInit, Input } from '@angular/core';
import { EssayService } from '../../services/essay.service';
import { Essay } from '../../../models/essay';

@Component({
  selector: 'app-essay-card',
  templateUrl: './essay-card.component.html',
  styleUrls: ['./essay-card.component.scss']
})
export class EssayCardComponent implements OnInit {
    @Input() essay: Essay;
    display = false;

    constructor(private essayService: EssayService) {}

    ngOnInit() {
    }

    onEditEssay() {
      this.essayService.essayEdited.emit(this.essay);
    }

    openDeleteEssay(){
       this.display = true;
    }

    refreshDisplay(event){
      this.display = event.value;
    }

    onDeleteEssay(event) {
      this.essayService.deleteEssay(this.essay.id)
        .subscribe(() => {
          this.essayService.notifyEssayDeletion(this.essay);
        });
    }
}
