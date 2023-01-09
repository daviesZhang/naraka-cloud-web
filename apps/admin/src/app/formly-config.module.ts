import {ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormlyModule} from "@ngx-formly/core";
import {TranslateService} from "@ngx-translate/core";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ]
})
export class FormlyConfigModule {



  static forRoot() : ModuleWithProviders<FormlyModule> {

    return FormlyModule.forRoot();
  }


}
