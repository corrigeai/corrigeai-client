import { EventEmitter } from '@angular/core';


export class ErrorService {

    errorOccurred = new EventEmitter<Error>();

    handleError(error: any): void {
        const errorMessage = error.error.error;
        this.errorOccurred.emit(errorMessage);
    }
}
