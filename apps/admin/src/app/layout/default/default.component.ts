import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MeService} from "@core/services/me.service";
import {filter, map, Observable} from "rxjs";
import {CurrentUser} from "@core/modal/me";
import {getTreeData} from "@shared/utils/tools";
import {menu} from "@core/modal/menu";

@Component({
  selector: 'naraka-cloud-web-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {

  menu$: Observable<Array<any>>;

  menuList = menu;


  menus = [
    {
      level: 1,
      title: 'Mail Group',
      icon: 'mail',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Group 1',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              level: 3,
              title: 'Option 1',
              selected: false,
              disabled: false
            },
            {
              level: 3,
              title: 'Option 2',
              selected: false,
              disabled: true
            }
          ]
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: true,
          disabled: false
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      level: 1,
      title: '系统管理',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: '租户管理',
          icon: 'user',
          url:'/system/tenement',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: '权限管理',
          url:'/system/authority',
          icon: 'user',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: '角色管理',
          url:'/system/role',
          icon: 'user',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: '用户管理',
          icon: 'user',
          url:'/system/user',
          selected: false,
          disabled: false
        }
      ]
    }
  ];

  current$: Observable<CurrentUser>;

  constructor(private meService: MeService) {
    this.current$ = <Observable<CurrentUser>>this.meService.me$
      .pipe(filter(next => !!next));
    this.menu$ = this.current$.pipe(
      map(next => getTreeData(next.menus,{parent:item=>item.parent,id:item => item.id})));
  }

  ngOnInit(): void {


  }



}
