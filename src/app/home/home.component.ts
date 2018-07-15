import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    description: String;
    topic: String;
    noTopicMessage: String;

    constructor(
        private topicService: TopicService
    ) {
        this.description = "O CorrigeAí ajuda você a se conectar com outras pessoas e juntos se ajudarem na escrita de redações.";
        this.noTopicMessage = 'Em breve será lançado um tópico semanal';
    }

    ngOnInit() {
        this.topicService.getOpenTopic()
            .subscribe(res => {
                this.topic = res.theme;
            });
    }
}
