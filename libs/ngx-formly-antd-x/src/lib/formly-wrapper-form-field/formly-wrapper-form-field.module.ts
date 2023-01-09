import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormlyWrapperFormFieldComponent} from "./formly-wrapper-form-field.component";
import { FormlyModule } from '@ngx-formly/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";



@NgModule({
  declarations: [FormlyWrapperFormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'form-field',
          component: FormlyWrapperFormFieldComponent,
        },
      ]
    })
    ],
  exports:[FormlyWrapperFormFieldComponent]
})
export class FormlyWrapperFormFieldModule { }
