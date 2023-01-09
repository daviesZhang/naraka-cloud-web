import {NgModule} from '@angular/core';
import {FormlyWrapperFormFieldModule} from "./formly-wrapper-form-field/formly-wrapper-form-field.module";
import {FormlyInputModule} from "./formly-input/formly-input.module";
import {FormlyLayoutSearchModule} from "./formly-layout-search/formly-layout-search.module";
import {FormlySelectModule} from "./formly-select/formly-select.module";
import {FormlyDateModule} from "./formly-date/formly-date.module";


@NgModule({
  declarations: [

  ],
  imports: [
    FormlyWrapperFormFieldModule,
    FormlyLayoutSearchModule,
    FormlyInputModule,
    FormlySelectModule,FormlyDateModule

  ],
  exports: [
  ]
})
export class NgxFormlyAntdXModule {}
