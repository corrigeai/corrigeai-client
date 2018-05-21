import { EventEmitter } from "@angular/core";

export class EssayService {
    essayCreated = new EventEmitter<any>();

    createEssay() {
        this.essayCreated.emit();
    }
}