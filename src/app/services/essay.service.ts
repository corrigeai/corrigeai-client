import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from "@angular/core";

import { environment } from '../../environments/environment';
import { Essay } from "../models/essay";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class EssayService {
    userEssayList : Essay[] = [];
    essayCreated = new EventEmitter<any>();
    essayEdited = new EventEmitter<Essay>();

    API = environment.apiUrl;

    constructor(private http: HttpClient) { }

    notifyEssayCreation() {
        this.essayCreated.emit();
    }

    notifyEssayEdition(essay: Essay) {
        this.essayEdited.emit(essay);
    }

    createEssay(essayData): Observable<any> {
        return this.http.post(this.API.concat('tuiterapi/essays'), essayData)
        .catch((error: Response) => {
            return  Observable.throw(error);
          });
    }


}