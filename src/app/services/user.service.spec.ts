import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { ErrorService } from './error.service';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            UserService,
            ErrorService,
            AuthenticationService
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ],
        });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
