import { EventEmitter } from "@angular/core";

import { Error } from "../errors/error.model";

export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any) {
        const errorData = new Error(error.error.error);
        this.errorOccurred.emit(errorData);
    }
}