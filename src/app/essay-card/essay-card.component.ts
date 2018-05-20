import { Component, OnInit } from '@angular/core';
import { EssayService } from '../services/essay.service';

@Component({
  selector: 'app-essay-card',
  templateUrl: './essay-card.component.html',
  styleUrls: ['./essay-card.component.scss']
})
export class EssayCardComponent implements OnInit {

    display = 'none';
    error = {message: "This is a message", title : "I'm a dumb error" };

    constructor(private essayService: EssayService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
      console.log("I guess the card exists");
        this.essayService.essayCreated
            .subscribe(
                () => {
                    this.display = 'block';
                }
            );
    }
}