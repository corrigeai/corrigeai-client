import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "../services/error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls : ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';

    constructor(private errorService: ErrorService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            );
    }
}