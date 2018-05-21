import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EssayService } from '../services/essay.service';
import { Essay } from '../models/essay';

@Component({
  selector: 'app-edit-essay',
  templateUrl: './edit-essay.component.html',
  styleUrls: ['./edit-essay.component.scss']
})
export class EditEssayComponent implements OnInit {
    editEssayForm: FormGroup;
    fileToUpload: File = null;
    display = 'none';

    constructor(private formBuilder: FormBuilder,private cd: ChangeDetectorRef,
         private essayService: EssayService) {
            this.editEssayForm = this.formBuilder.group({
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
        this.essayService.essayEdited
        .subscribe(
            (essay: Essay) => {
                this.editEssayForm.patchValue({
                    essayImg : essay.essayImg,
                    theme : essay.theme,
                    essayText: essay.essayText,
                    title : essay.title
                });
                this.display = 'block';
            }
        );
    }

    submitForm(form: any): void {
            // var essayData = {};
            // essayData["userUsername"] = JSON.parse(localStorage.getItem('currentUser')).username;
            // essayData["theme"] = form.theme;
            // essayData["title"] = form.title;
            // essayData["content"] = (form.essayText !== null ? form.essayText : form.essayImg);            

            // this.essayService.createEssay(essayData).
            // subscribe(
            //     (essay: Essay) => {
            //         this.essayService.userEssayList.push(essay);
            //     }
            // );
            
        this.onEndSubmission();

    }

    onFileChange(event) {
        const reader = new FileReader();
       
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
        
          reader.onload = () => {
            this.editEssayForm.patchValue({
                essayImg: reader.result
            });
            
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }

      }

}
