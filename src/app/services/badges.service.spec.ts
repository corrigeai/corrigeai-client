import { TestBed, inject } from '@angular/core/testing';

import { BadgesService } from './badges.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BadgesService]
    });
  });

  it('should be created', inject([BadgesService], (service: BadgesService) => {
    expect(service).toBeTruthy();
  }));
});
