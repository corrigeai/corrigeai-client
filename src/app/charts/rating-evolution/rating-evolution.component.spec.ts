import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingEvolutionComponent } from './rating-evolution.component';

describe('RatingEvolutionComponent', () => {
  let component: RatingEvolutionComponent;
  let fixture: ComponentFixture<RatingEvolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingEvolutionComponent ]
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
