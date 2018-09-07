import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EssayService } from '../../services/essay.service';
import { Essay } from '../../../models/essay';
import { DomSanitizer } from '@angular/platform-browser';

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
    imagePath;

    constructor(private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private _sanitizer: DomSanitizer,
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
                this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(essay.content);
                this.editEssayForm.patchValue({
                    essayImg : (essay.type === 'Image' ? essay.content : null),
                    theme : essay.theme,
                    essayText: (essay.type === 'Text' ? essay.content : null),
                    title : essay.title
                });
                this.display = 'block';
            }
        );
    }

    isValid64Base(text) {
        const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
        return regex.test(text);
    }

    complyForm(form: any): any {
        form['id'] = this.original.id;
        form['content'] = ((form['essayText'] !== null && form['essayText'] !== '') ? form['essayText'] : form['essayImg']);
        delete form.essayImg;
        delete form.essayText;
        return form;
    }

    submitForm(form: any): void {
        form = this.complyForm(form);
        form['type'] = ((form.essayText !== null && form.essayText !== '') ? 'Text' : 'Image');
        this.essayService.editEssay(form)
        .subscribe(
            (essay) => {
                this.essayService.updateEssayElement(this.original, essay);
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
            this.editEssayForm.patchValue({
                essayImg: reader.result
            });

            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }

      }

}
