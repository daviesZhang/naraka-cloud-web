import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyFieldSelectComponent} from './formly-field-select/formly-field-select.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyWrapperFormFieldModule} from "../formly-wrapper-form-field/formly-wrapper-form-field.module";
import {NzSelectModule} from "ng-zorro-antd/select";
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  LoadingOutline
} from '@ant-design/icons-angular/icons';

const icons = [LoadingOutline];


@NgModule({
  declarations: [
    FormlyFieldSelectComponent,

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
                    name: 'select',
                    component: FormlyFieldSelectComponent,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ],
  exports: [FormlyFieldSelectComponent]
})
export class FormlySelectModule {
}
