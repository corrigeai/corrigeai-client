import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { EditProfileComponent } from './edit-profile.component';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';


describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileComponent ],
      providers: [
        AuthenticationService,
        ErrorService,
        UserService
       ],
      imports: [
          RouterTestingModule,
          ReactiveFormsModule,
          HttpClientTestingModule
        ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
