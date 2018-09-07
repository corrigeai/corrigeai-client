import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { ErrorService } from './error.service';
import { TopicService } from './topic.service';

describe('TopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            TopicService,
            ErrorService,
            AuthenticationService
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]
        });
  });

  it('should be created', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));
});
