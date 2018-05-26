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

    constructor(private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
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
                this.original = essay;
                console.log(essay.content);
                this.editEssayForm.patchValue({
                    essayImg : (this.isValid64Base(essay.content) ? this.dataURLtoFile(essay.content,'userFile'): null),
                    theme : essay.theme,
                    essayText: (this.isValid64Base(essay.content) ? '': essay.content),
                    title : essay.title
                });
                this.display = 'block';
            }
        );
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    isValid64Base(text) {
        var regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
        return regex.test(text);
    }

    complyForm(form: any):any {
        form["id"] = this.original.id;
        form["content"] = ((form["essayText"] !== null && form["essayText"] !== '') ? form["essayText"] : form["essayImg"])
        delete form.essayImg;
        delete form.essayText;
        return form;
    }

    submitForm(form: any): void {
        form = this.complyForm(form);
        console.log(form);

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
