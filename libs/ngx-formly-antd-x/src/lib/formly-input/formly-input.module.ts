import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyFieldInputComponent} from './formly-field-input/formly-field-input.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyWrapperFormFieldModule} from "../formly-wrapper-form-field/formly-wrapper-form-field.module";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";


@NgModule({
  declarations: [
    FormlyFieldInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    FormlyModule,
    NzInputNumberModule,
    FormlyWrapperFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'input',
          component: FormlyFieldInputComponent,
          wrappers: ['form-field'],
        },
      ],
    }),

  ],
  exports:[FormlyFieldInputComponent]
})
export class FormlyInputModule { }
