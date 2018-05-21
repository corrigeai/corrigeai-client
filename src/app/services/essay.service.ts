import { EventEmitter } from "@angular/core";
import { Essay } from "../models/essay";

export class EssayService {
    essayCreated = new EventEmitter<any>();
    essayEdited = new EventEmitter<Essay>();

    createEssay() {
        this.essayCreated.emit();
    }

    editEssay(essay: Essay) {
        this.essayEdited.emit(essay);
    }
}