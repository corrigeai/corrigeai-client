import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "../services/error.service";

import swal from 'sweetalert2';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls : ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

    constructor(private errorService: ErrorService) {}

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (mensagem: any) => {
                    this.errorMessage(mensagem);
                }
            );
    }

    private showMessages() {
        swal('Bem Vindo', 'Ao Sweet Alert 2 Component', 'success');
    }
      
      private errorMessage(mensagem: any) {
        swal('Ops', mensagem, 'error');
      }
}