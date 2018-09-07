import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { ReviewStationComponent } from './reviewstation.component';
import { EssayService } from '../services/essay.service';
import { ErrorService } from '../services/error.service';

describe('ReviewStationComponent', () => {
  let component: ReviewStationComponent;
  let fixture: ComponentFixture<ReviewStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewStationComponent ],
      providers: [
        EssayService,
        AuthenticationService,
        ErrorService
       ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
