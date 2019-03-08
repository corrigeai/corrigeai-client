import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RatingEvolutionComponent } from './rating-evolution.component';
import { AuthenticationService } from '../../services/authentication.service';
import { StatsService } from '../../services/stats.service';
import { ErrorService } from '../../services/error.service';

describe('RatingEvolutionComponent', () => {
  let component: RatingEvolutionComponent;
  let fixture: ComponentFixture<RatingEvolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingEvolutionComponent ],
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
    fixture = TestBed.createComponent(RatingEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
