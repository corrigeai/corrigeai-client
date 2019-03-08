import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ApprovalRateComponent } from './approval-rate.component';
import { AuthenticationService } from '../../services/authentication.service';
import { StatsService } from '../../services/stats.service';
import { ErrorService } from '../../services/error.service';

describe('ApprovalRateComponent', () => {
  let component: ApprovalRateComponent;
  let fixture: ComponentFixture<ApprovalRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalRateComponent ],
      providers: [
        StatsService,
        ErrorService,
        AuthenticationService
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
