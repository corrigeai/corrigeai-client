import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ErrorService
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]    });
  });

  it('should be created', inject([ErrorService], (service: ErrorService) => {
    expect(service).toBeTruthy();
  }));
});
