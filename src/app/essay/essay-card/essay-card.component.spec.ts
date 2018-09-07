import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ReviewService } from '../../services/review.service';
import { EssayService } from '../../services/essay.service';
import { ErrorService } from '../../services/error.service';
import { EssayCardComponent } from './essay-card.component';


describe('EssayCardComponent', () => {
  let component: EssayCardComponent;
  let fixture: ComponentFixture<EssayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssayCardComponent ],
      providers: [
        ErrorService,
        EssayService,
        ReviewService,
        AuthenticationService
       ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
