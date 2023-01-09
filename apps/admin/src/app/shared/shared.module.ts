import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {IconsProviderModule} from "@shared/icons-provider.module";
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import {TranslateModule} from "@ngx-translate/core";
import { AclDirective } from './acl.directive';




@NgModule({
  declarations: [
    LoginModalComponent,
    AclDirective

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
    IconsProviderModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    ...SHARED_ZORRO_MODULES,
    IconsProviderModule,
    LoginModalComponent,
    AclDirective

  ]
})
export class SharedModule { }
