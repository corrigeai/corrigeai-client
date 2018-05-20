import { EventEmitter } from "@angular/core";

export class EssayService {
    essayCreated = new EventEmitter<any>();

    createEssay() {
        console.log("Service is called at least");
        const errorData = {message: "This is a message", title : "I'm a dumb error" };
        this.essayCreated.emit(errorData);
    }
}