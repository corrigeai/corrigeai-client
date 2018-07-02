import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Topic } from '../../models/topic';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class TopicService {

    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    createTopic(topicData: Topic): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('topics'), topicData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    editTopic(topicData: Topic, topicId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('topics/' + topicId), topicData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getTopicById(topicId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('topics/' + topicId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getAllTopics(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('topics/all'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getOpenTopic(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('topics'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getEssaysByTopic(topicId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('topics/' + topicId + '/essays'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

}
