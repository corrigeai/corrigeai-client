import { Component, OnInit } from '@angular/core';
import { EssayService } from '../services/essay.service';

@Component({
  selector: 'app-essay-card',
  templateUrl: './essay-card.component.html',
  styleUrls: ['./essay-card.component.scss']
})
export class EssayCardComponent implements OnInit {
    title: string = "Lorem ipsum dolor sit amet";
    theme: string = "Aliquam eu nibh id est semper efficitur";
    textBody: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget auctor diam. Suspendisse fermentum a nibh sed fringilla. Donec sit amet nisi gravida, laoreet leo nec, faucibus elit. Donec non sollicitudin dolor. Donec ut nisl eu mauris elementum volutpat. Curabitur rutrum ac erat at ultricies. Etiam rutrum facilisis diam sit amet consequat. Sed sed nulla eleifend, pulvinar tortor in, vehicula eros. Vivamus dapibus, lacus eget venenatis tincidunt, risus eros mattis lectus, vitae porttitor mi nisi vitae felis.";

    constructor(private essayService: EssayService) {}

    ngOnInit() {
      console.log("I guess the card exists");
    }
}