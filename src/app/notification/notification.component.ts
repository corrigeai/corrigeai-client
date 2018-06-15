import { Component, OnInit } from "@angular/core";

import { Notification } from "../../models/notification";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    notification: Notification;
    display = 'none';

    constructor() {}

    onNotificationHandled() {
        this.display = 'none';
    }

    ngOnInit() {
    }
}