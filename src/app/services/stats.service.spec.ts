import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { StatsService } from './stats.service';
import { AuthenticationService } from './authentication.service';
import { ErrorService } from './error.service';

describe('StatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatsService,
        ErrorService,
        AuthenticationService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([StatsService], (service: StatsService) => {
    expect(service).toBeTruthy();
  }));
});
