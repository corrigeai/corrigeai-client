import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-essay',
  templateUrl: './delete-essay.component.html',
  styleUrls: ['./delete-essay.component.scss']
})
export class DeleteEssayComponent implements OnInit {
  @Input() display;
  @Output() displayEvent = new EventEmitter();
  @Output() deleteEssay = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeDeleteEssay(){
    this.display = false;
    this.displayEvent.emit(this.display);
  }

  acceptDeleteEssay(){
    this.deleteEssay.emit({});
    this.closeDeleteEssay();
  }
}
