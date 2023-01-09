import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {environment} from '@env/environment';
// layout
import {DefaultComponent} from '../layout/default/default.component';
import {PassportComponent} from '../layout/passport/passport.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,

    children: [
      // 业务子模块
      {path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule)}
    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: PassportComponent,
    children: [
      {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    ]
  },
  // 单页不包裹Layout

  {path: '**', redirectTo: 'exception/404'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
