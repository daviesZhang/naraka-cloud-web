import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SystemRoutingModule } from './system-routing.module';
import { UserComponent } from './user/user.component';

import { JsonFormModule } from '@shared/json-form/json-form.module';
import { GridTableModule } from '@shared/grid-table.module';
import { CommonModalModule } from '@shared/common-modal/common-modal.module';
import { SharedModule } from '@shared/shared.module';
import { RoleComponent } from './role/role.component';
import { AuthorityComponent } from './authority/authority.component';
import { OperationLogComponent } from './operation-log/operation-log.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { RoleAuthorityComponent } from './role/role-authority/role-authority.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { TenementComponent } from './tenement/tenement.component';

@NgModule({
  declarations: [
    MenuComponent,
    UserComponent,
    RoleComponent,
    AuthorityComponent,
    OperationLogComponent,
    RoleAuthorityComponent,
    TenementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    GridTableModule,
    JsonFormModule,
    NzDrawerModule,
    CommonModalModule,
    NzSwitchModule,
  ],
})
export class SystemModule {}
