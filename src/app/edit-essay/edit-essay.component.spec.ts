import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEssayComponent } from './edit-essay.component';

describe('EditEssayComponent', () => {
  let component: EditEssayComponent;
  let fixture: ComponentFixture<EditEssayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEssayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEssayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
