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

    /** Production/Development API URL */
    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    /**
     * Requests the creation of a topic.
     * @param topicData - The topic related data.
     */
    createTopic(topicData: Topic): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('topics'), topicData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests the edition of a topic.
     * @param topicData - The new topic data.
     */
    editTopic(topicData: Topic, topicId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('topics/' + topicId), topicData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests a topic by its id.
     * @param topicId - Requested topic id.
     */
    getTopicById(topicId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('topics/' + topicId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests all existing topics.
     */
    getAllTopics(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('topics/all'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests currently open topic.
     */
    getOpenTopic(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('topics'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            // we do not want the user to see an error if there is not a topic,
            // just see a message to wait a bit for a new topic
            return  Observable.throw(error);
          });
    }

    /**
     * Requests essays related to specific topic.
     * @param topicId - Id of the topic.
     */
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
