import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EssayService } from '../services/essay.service';
import { Essay } from '../models/essay';

@Component({
  selector: 'app-create-essay',
  templateUrl: './create-essay.component.html',
  styleUrls: ['./create-essay.component.scss']
})
export class CreateEssayComponent implements OnInit {
    createEssayForm: FormGroup;
    fileToUpload: File = null;
    display = 'none';
    edit = false;

    constructor(private formBuilder: FormBuilder,private cd: ChangeDetectorRef,
         private essayService: EssayService) {
            this.createEssayForm = this.formBuilder.group({
                title : [null, Validators.required],
                theme : [null, Validators.required],
                essayImg : [null],
                essayText : [null]
                });
        }

    onEndSubmission() {
        this.display = 'none';
    }

    ngOnInit() {
        this.essayService.essayCreated
            .subscribe(
                () => {
                    this.createEssayForm.reset();
                    this.display = 'block';
                    this.edit = false;
                }
            );
        
        this.essayService.essayEdited
        .subscribe(
            (essay: Essay) => {
                this.createEssayForm.patchValue({
                    essayImg : essay.essayImg,
                    theme : essay.theme,
                    essayText: essay.essayText,
                    title : essay.title
                });
                this.display = 'block';
                this.edit = true;
            }
        );
    }

    submitForm(form: any): void {
        if(this.edit){
           // TO DO related to edition
        } else {
            var essayData = {};
            essayData["userUsername"] = JSON.parse(localStorage.getItem('currentUser')).username;
            essayData["theme"] = form.theme;
            essayData["title"] = form.title;
            essayData["content"] = (form.essayText !== null ? form.essayText : form.essayImg);            

            this.essayService.createEssay(essayData).
            subscribe(
                (essay: Essay) => {
                    this.essayService.userEssayList.push(essay);
                }
            );
        }
        this.onEndSubmission();

    }

    onFileChange(event) {
        const reader = new FileReader();
       
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
        
          reader.onload = () => {
            this.createEssayForm.patchValue({
                essayImg: reader.result
            });
            
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }

      }

}
