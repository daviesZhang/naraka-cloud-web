import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { PassportComponent } from './passport/passport.component';
import {RouterModule} from "@angular/router";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {SharedModule} from "@shared/shared.module";
import { DefaultLayoutSiderComponent } from './default/default-layout-sider/default-layout-sider.component';


@NgModule({
  declarations: [
    DefaultComponent,
    PassportComponent,
    DefaultLayoutSiderComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    SharedModule
  ]
})
export class LayoutModule { }
