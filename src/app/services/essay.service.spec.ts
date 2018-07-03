import { TestBed, inject } from '@angular/core/testing';

import { EssayService } from './essay.service';


describe('EssayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EssayService]
    });
  });

  it('should be created', inject([EssayService], (service: EssayService) => {
    expect(service).toBeTruthy();
  }));
});
