import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchLayoutComponent} from './search-layout/search-layout.component';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";


@NgModule({
  declarations: [
    SearchLayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    FormlyModule.forChild({
      wrappers: [
        { name: 'search', component: SearchLayoutComponent },
      ],
    }),
  ],
  exports:[SearchLayoutComponent]
})
export class FormlyLayoutSearchModule { }
