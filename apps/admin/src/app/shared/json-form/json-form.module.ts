import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormComponent } from './json-form.component';
import {FormlyModule} from "@ngx-formly/core";

import {SharedModule} from "@shared/shared.module";
import {NgxFormlyAntdXModule} from "ngx-formly-antd-x";



@NgModule({
  declarations: [
    JsonFormComponent
  ],
  imports: [
    CommonModule,
    FormlyModule,
    NgxFormlyAntdXModule,
    SharedModule,
  ],
  exports:[
    JsonFormComponent,
    FormlyModule
  ]
})
export class JsonFormModule { }
