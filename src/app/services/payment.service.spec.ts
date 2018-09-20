import { TestBed, inject } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { ErrorService } from './error.service';
import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentService', () => {  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentService, ErrorService, AuthenticationService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([PaymentService], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});
