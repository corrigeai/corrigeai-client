import { EventEmitter } from '@angular/core';


export class ErrorService {

    /** Event emitter to notify an error has occurred */
    errorOccurred = new EventEmitter<Error>();

    /**
     * Triggers the due error handling by providing error component with
     * an appropriated error object.
     */
    handleError(error: any): void {
        const errorMessage = error.error.error;
        this.errorOccurred.emit(errorMessage);
    }
}
