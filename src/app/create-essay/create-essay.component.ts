import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EssayService } from '../services/essay.service';

@Component({
  selector: 'app-create-essay',
  templateUrl: './create-essay.component.html',
  styleUrls: ['./create-essay.component.scss']
})
export class CreateEssayComponent implements OnInit {
    createEssayForm: FormGroup;
    fileToUpload: File = null;
    display = 'none';

    constructor(private formBuilder: FormBuilder,private cd: ChangeDetectorRef,
         private essayService: EssayService) {
            this.createEssayForm = this.formBuilder.group({
                title : [null, Validators.required],
                theme : [null, Validators.required],
                essayImg : [null],
                essayText : [null]
                });
        }

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.essayService.essayCreated
            .subscribe(
                () => {
                    this.display = 'block';
                }
            );
    }

    submitForm(form: any): void {
        console.log(form);
    //    this.userService.editUser(form)
    //     .subscribe(
    //       result => {
    //         if (result) {
    //           this.router.navigate(['/']);
    //           this.error = undefined;
    //           this.editProfileForm.reset();
    //         }
    //       },
    //       error => this.error = error
    //     );
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
