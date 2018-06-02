import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEssayComponent } from './create-essay.component';

describe('CreateEssayComponent', () => {
  let component: CreateEssayComponent;
  let fixture: ComponentFixture<CreateEssayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEssayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEssayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
