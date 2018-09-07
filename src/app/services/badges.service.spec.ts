import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { BadgesService } from './badges.service';
import { ErrorService } from './error.service';


describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ErrorService,
            BadgesService,
            AuthenticationService
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]
        });
  });

  it('should be created', inject([BadgesService], (service: BadgesService) => {
    expect(service).toBeTruthy();
  }));
});
