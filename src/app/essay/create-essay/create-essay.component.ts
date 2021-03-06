import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EssayService } from '../../services/essay.service';
import { TopicService } from '../../services/topic.service';
import { Essay } from '../../../models/essay';
import { User } from '../../../models/user';
import { PaymentService } from '../../services/payment.service';

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
    user: User;
    needPayment: boolean;

    paymentValue = 0;
    singleEssayPrice = 12;
    premiumBasicEssayPrice = 11;
    premiumPlatinumEssayPrice = 10;

    @ViewChild('essayImage')
    essayImage: ElementRef;
    hasPacks = false;
    lastPack: any;

    constructor(private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private essayService: EssayService,
        private topicService: TopicService,
        private paymentService: PaymentService) {

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

                    if (this.essayImage) {
                      this.essayImage.nativeElement.value = '';
                    }
                }
            );

        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.user.role === 'Free') {
            this.paymentValue = this.singleEssayPrice;
        } else {
            this.paymentService.getLastValidPack()
                .subscribe(res => {
                    this.hasPacks = true;
                    this.paymentValue = 0;
                    console.log('opa3', this.paymentValue);
                    this.lastPack = res;
                }, err => {
                    this.paymentValue = this.singleEssayPrice;
                    console.log('opa2', this.paymentValue);
                });
        }

        if (this.user.usingWeekelyTopic) {
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

    submitForm(form: any, paid: boolean): void {

            const essayData = {};
            essayData['userUsername'] = JSON.parse(sessionStorage.getItem('currentUser')).username;
            essayData['theme'] = form.theme;
            essayData['title'] = form.title;
            essayData['content'] = ((form.essayText !== null && form.essayText !== '') ? form.essayText : form.essayImg);
            essayData['type'] = ((form.essayText !== null && form.essayText !== '') ? 'Text' : 'Image');
            essayData['premium'] = paid;

            this.essayService.createEssay(essayData)
            .subscribe(
                (essay: Essay) => {
                    this.essayService.addEssayElement(essay);

                    if (paid) {
                        const record = this.createRecord(essay);

                        this.paymentService.createRecord(record)
                            .subscribe(() => {
                                this.onEndSubmission();
                            });
                    } else {
                        this.onEndSubmission();
                    }
                }
            );

    }

    private createRecord(essay) {
        let record;
        if (!this.hasPacks) {
            record = {
                essayId: essay.id,
                value: this.paymentValue * 0.2
            };
        } else {
            if (this.lastPack.type === 'Basic') {
                record = {
                    essayId: essay.id,
                    value: this.premiumBasicEssayPrice * 0.2
                };
            } else {
                record = {
                    essayId: essay.id,
                    value: this.premiumPlatinumEssayPrice * 0.2
                };
            }
        }
        return record;
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
