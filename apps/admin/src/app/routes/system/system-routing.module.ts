import {NgModule} from '@angular/core';
import {Routes, RouterModule, UrlSegment} from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {UserComponent} from "./user/user.component";
import {AuthorityComponent} from "./authority/authority.component";
import {RoleComponent} from "./role/role.component";
import {TenementComponent} from "./tenement/tenement.component";


const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'user', component: UserComponent},
  {path: 'role', component: RoleComponent},
  {path: 'tenement', component: TenementComponent},
  {path: 'authority', component: AuthorityComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
