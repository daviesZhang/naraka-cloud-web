import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModalComponent } from './common-modal/common-modal.component';
import {JsonFormModule} from "@shared/json-form/json-form.module";
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [
    CommonModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    JsonFormModule,
  ],
  exports:[
    CommonModalComponent
  ]
})
export class CommonModalModule { }
