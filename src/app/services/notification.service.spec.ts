import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';
import { ErrorService } from './error.service';

import * as SockJS from 'sockjs-client';

const API = environment.apiUrl;
const entrypoint = API.concat('notifications/ws');

const stompConfig = {
  url: new SockJS(entrypoint),
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: true
};
describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ErrorService,
            StompService,
            NotificationService,
            AuthenticationService,
            {
                provide: StompConfig,
                useValue: stompConfig
              }
          ],
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]
        });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
