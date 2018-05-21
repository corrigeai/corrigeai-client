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
        .map((response: Response) => response)
        .catch((error: Response) => {
            return  Observable.throw(error);
          });
    }

    getUserEssays(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(localStorage.getItem('currentUser')).id;
        return this.http.get<Essay[]>(this.API.concat('tuiterapi/users/'+userId+'/essays'), httpOptions)
        .map((essays: Essay[]) => essays)
        .catch((error: Response) => {
            return  Observable.throw(error);
          });
    }

    editEssay(essayData): Observable<any> {
        const essayId = essayData.id;
        delete essayData.id;
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('tuiterapi/essays/'+essayId), essayData, httpOptions)
        .catch((error: Response) => {
            return  Observable.throw(error);
          });
    }


}
