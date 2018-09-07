import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EssayService } from '../../services/essay.service';
import { TopicService } from '../../services/topic.service';
import { Essay } from '../../../models/essay';
import { User } from '../../../models/user';

@Component({
  selector: 'app-create-essay',
  templateUrl: './create-essay.component.html',
  styleUrls: ['./create-essay.component.scss']
})
export class CreateEssayComponent implements OnInit {
    createEssayForm: FormGroup;
    theme: String;
    imagePath = null;
    display = 'none';

    constructor(private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private essayService: EssayService,
        private topicService: TopicService) {

        this.createEssayForm = this.formBuilder.group({
                title : [null, Validators.required],
                theme : [null, Validators.required],
                essayImg : [null],
                essayText : [null]
            });
    }

    onEndSubmission() {
        this.display = 'none';
        this.createEssayForm.reset();
        this.imagePath = null;
    }

    ngOnInit() {
        this.essayService.essayCreated
            .subscribe(
                () => {
                    this.display = 'block';
                    this.cd.markForCheck();
                }
            );

        const user: User = JSON.parse(sessionStorage.getItem('currentUser'));
        if (user.usingWeekelyTopic) {
            this.topicService.getOpenTopic()
            .subscribe(res => {
                this.theme = res.theme;
                this.createEssayForm = this.formBuilder.group({
                    title : [null, Validators.required],
                    theme : [res.theme, Validators.required],
                    essayImg : [null],
                    essayText : [null]
                });
            });
        }
    }

    submitForm(form: any): void {

            const essayData = {};
            essayData['userUsername'] = JSON.parse(sessionStorage.getItem('currentUser')).username;
            essayData['theme'] = form.theme;
            essayData['title'] = form.title;
            essayData['content'] = ((form.essayText !== null && form.essayText !== '') ? form.essayText : form.essayImg);
            essayData['type'] = ((form.essayText !== null && form.essayText !== '') ? 'Text' : 'Image');

            this.essayService.createEssay(essayData)
            .subscribe(
                (essay: Essay) => {
                    this.essayService.addEssayElement(essay);
                    this.onEndSubmission();
                }
            );

    }

    isEmpty(value: any): string {
        if (value == null) {
            return 'true';
        } else if (value === '') {
            return 'true';
        } else {
            return 'false';
        }
    }

    onFileChange(event) {
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imagePath = reader.result;
            this.createEssayForm.patchValue({
                essayImg: reader.result
            });

            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }

      }

}
