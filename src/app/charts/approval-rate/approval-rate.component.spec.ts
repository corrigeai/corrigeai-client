import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRateComponent } from './approval-rate.component';

describe('ApprovalRateComponent', () => {
  let component: ApprovalRateComponent;
  let fixture: ComponentFixture<ApprovalRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalRateComponent ]
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
