import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { ErrorService } from './error.service';
import { EssayService } from './essay.service';


describe('EssayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          EssayService,
          ErrorService,
          AuthenticationService
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]
    });
  });

  it('should be created', inject([EssayService], (service: EssayService) => {
    expect(service).toBeTruthy();
  }));
});
