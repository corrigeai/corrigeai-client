import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from "@angular/core";

import { environment } from '../../environments/environment';
import { Essay } from "../models/essay";

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class EssayService {
    userEssayList : Essay[] = [];
    essayCreated = new EventEmitter<any>();
    essayEdited = new EventEmitter<Essay>();

    API = environment.apiUrl;

    constructor(private http: HttpClient,private authService: AuthenticationService) { }

    notifyEssayCreation() {
        this.essayCreated.emit();
    }

    notifyEssayEdition(essay: Essay) {
        this.essayEdited.emit(essay);
    }

    createEssay(essayData): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('tuiterapi/essays'), essayData, httpOptions)
        .catch((error: Response) => {
            return  Observable.throw(error);
          });
    }

    getUserEssays(essayData): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(localStorage.getItem('currentUser')).id;
        return this.http.get(this.API.concat('tuiterapi/users/'+userId+'/essays'), httpOptions)
        .catch((error: Response) => {
            return  Observable.throw(error);
          });
    }


}
