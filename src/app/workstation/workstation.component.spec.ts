import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { WorkstationComponent } from './workstation.component';
import { EssayService } from '../services/essay.service';
import { ErrorService } from '../services/error.service';

describe('WorkstationComponent', () => {
  let component: WorkstationComponent;
  let fixture: ComponentFixture<WorkstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkstationComponent],
       providers: [
         EssayService,
         AuthenticationService,
         ErrorService
        ],
       imports: [RouterTestingModule, HttpClientTestingModule],
       schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkstationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
