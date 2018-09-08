import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { RatingService } from './rating.service';
import { ErrorService } from './error.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ErrorService,
            RatingService,
            AuthenticationService
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]
        });
  });

  it('should be created', inject([RatingService], (service: RatingService) => {
    expect(service).toBeTruthy();
  }));
});
