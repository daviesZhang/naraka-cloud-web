import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyWrapperFormFieldModule} from "../formly-wrapper-form-field/formly-wrapper-form-field.module";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';

import {LoadingOutline} from '@ant-design/icons-angular/icons';
import {FormlyFieldTreeSelectComponent} from './formly-field-tree-select/formly-field-tree-select.component';
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";

const icons = [LoadingOutline];


@NgModule({
  declarations: [
    FormlyFieldTreeSelectComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    FormlyModule,
    NzSelectModule,
    FormlyWrapperFormFieldModule,
    NzIconModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'tree-select',
          component: FormlyFieldTreeSelectComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
    NzTreeSelectModule,
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ],
  exports: [FormlyFieldTreeSelectComponent]
})
export class FormlyTreeSelectModule {
}
