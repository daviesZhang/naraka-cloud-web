import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormlyModule} from "@ngx-formly/core";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormlyWrapperFormFieldModule} from "../formly-wrapper-form-field/formly-wrapper-form-field.module";
import {FormlyFieldDateComponent} from "./formly-field-date/formly-field-date.component";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { FormlyFieldDateRangeComponent } from './formly-field-date-range/formly-field-date-range.component';


@NgModule({
  declarations: [FormlyFieldDateComponent, FormlyFieldDateRangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    FormlyModule,
   NzDatePickerModule,
    FormlyWrapperFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'date',
          component: FormlyFieldDateComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'date-range',
          component: FormlyFieldDateRangeComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ], exports: [FormlyFieldDateComponent,FormlyFieldDateRangeComponent]
})
export class FormlyDateModule {
}
