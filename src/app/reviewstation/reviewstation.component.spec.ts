import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStationComponent } from './reviewstation.component';

describe('ReviewStationComponent', () => {
  let component: ReviewStationComponent;
  let fixture: ComponentFixture<ReviewStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
