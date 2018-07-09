import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Essay } from '../../models/essay';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class EssayService {

    private essayCollection: Essay[] = [];
    /** Event emitter to notify an essay has been created */
    essayCreated = new EventEmitter<any>();
    /** Event emitter to notify an essay has been edited */
    essayEdited = new EventEmitter<Essay>();
    /** Event emitter to notify an essay has been deleted */
    essayDeleted = new EventEmitter<any>();
    /** Production/Development API URL */
    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    // essayCollection related Methods

    updateEssayElement(original: Essay, newEssay: Essay): void {
        const index = this.essayCollection.indexOf(original);
        this.essayCollection[index] = newEssay;
    }

    addEssayElement(essay: Essay): void {
        this.essayCollection.push(essay);
    }

    setEssayCollection(essayCollection: Essay[]): void {
        this.essayCollection = essayCollection;
    }

    getEssayCollection(): Essay[] {
        return this.essayCollection;
    }

    // Event Emission related methods

    /**
     * Emits event notifying an essay has been created.
     */
    notifyEssayCreation(): void {
        this.essayCreated.emit();
    }

    /**
     * Emits event notifying an essay has been edited.
     */
    notifyEssayEdition(essay: Essay): void {
        this.essayEdited.emit(essay);
    }

    /**
     * Emits event notifying an essay has been deleted.
     */
    notifyEssayDeletion(deletedEssay: Essay): void {
        this.essayCollection = this.essayCollection
                .filter(essay => essay.id !== deletedEssay.id);
        this.essayDeleted.emit();
    }

    // HTTP related methods

    /**
     * Requests the creation of an essay.
     * @param essayData - The essay related data.
     */
    createEssay(essayData): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('essays'), essayData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests the deletion of an essay.
     * @param essayId - Id of the essay to be deleted.
     */
    deleteEssay(essayId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.delete(this.API.concat('essays/' + essayId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
        });
    }

    /**
     * Requests the essays related to the currently validated user.
     */
    getUserEssays(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;

        return this.http.get<Essay[]>(this.API.concat('users/' + userId + '/essays'), httpOptions)
        .map((essays: Essay[]) => essays)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests the edition of an essay.
     * @param essayData - The new essay data.
     */
    editEssay(essayData): Observable<any> {
        const essayId = essayData.id;
        delete essayData.id;
        const httpOptions = this.authService.getOptions();

        return this.http.put(this.API.concat('essays/' + essayId), essayData, httpOptions)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests a valid essay for the currently validated user.
     */
    receiveToReview(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
        return this.http.get<Essay>(this.API.concat('users/' + userId + '/evaluate'), httpOptions)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

}
