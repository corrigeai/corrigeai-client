import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { EssayService } from '../../services/essay.service';
import { ErrorService } from '../../services/error.service';
import { EditEssayComponent } from './edit-essay.component';


describe('EditEssayComponent', () => {
  let component: EditEssayComponent;
  let fixture: ComponentFixture<EditEssayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEssayComponent ],
      providers: [
        FormBuilder,
        ErrorService,
        EssayService,
        ReactiveFormsModule,
        AuthenticationService
       ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEssayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
