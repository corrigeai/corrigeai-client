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
    original;

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
                let isValidFile = (essay.content, File);
                this.original = essay;
                this.editEssayForm.patchValue({
                    essayImg : essay.content,
                    theme : essay.theme,
                    essayText: essay.content,
                    title : essay.title
                });
                this.display = 'block';
            }
        );
    }

    complyForm(form: any):any {
        form["id"] = this.original.id;
        form["content"] = (form["essayText"] !== null ? form["essayText"] : form["essayImg"])
        delete form.essayImg;
        delete form.essayText;
        return form;
    }
    
    submitForm(form: any): void {
        form = this.complyForm(form);

        this.essayService.editEssay(form)
        .subscribe(
            (essay) => {
                let index = this.essayService.userEssayList.indexOf(this.original);
                this.essayService.userEssayList[index] = essay;
                this.onEndSubmission();
            }
        );           
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
