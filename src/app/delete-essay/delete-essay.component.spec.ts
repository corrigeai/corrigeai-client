import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEssayComponent } from './delete-essay.component';

describe('DeleteEssayComponent', () => {
  let component: DeleteEssayComponent;
  let fixture: ComponentFixture<DeleteEssayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEssayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEssayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
