import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { CreateEssayComponent } from './create-essay.component';
import { EssayService } from '../../services/essay.service';
import { ErrorService } from '../../services/error.service';
import { TopicService } from '../../services/topic.service';
import { PaymentService } from '../../services/payment.service';


describe('CreateEssayComponent', () => {
  let component: CreateEssayComponent;
  let fixture: ComponentFixture<CreateEssayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEssayComponent ],
      providers: [
        FormBuilder,
        TopicService,
        ErrorService,
        EssayService,
        ReactiveFormsModule,
        AuthenticationService,
        PaymentService
       ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEssayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
