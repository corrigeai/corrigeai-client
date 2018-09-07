import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { ReviewService } from './review.service';
import { EssayService } from './essay.service';
import { ErrorService } from './error.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ErrorService,
            EssayService,
            ReviewService,
            AuthenticationService
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]
        });
  });

  it('should be created', inject([ReviewService], (service: ReviewService) => {
    expect(service).toBeTruthy();
  }));
});
