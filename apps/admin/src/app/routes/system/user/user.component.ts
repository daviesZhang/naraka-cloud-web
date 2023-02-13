import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ColDef, GridOptions, RowNode} from "ag-grid-community";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {AbstractGridTablePage} from "../../abstract-grid-table-page";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ValidationService} from "../../../core/services/validation.service";
import {CrudHelperService} from "../../../core/services/crud-helper.service";
import {TranslateService} from "@ngx-translate/core";
import {Page, PageItem} from "../../../core/modal/page";
import {ParamsTransform, QueryPage} from "../../../core/modal/query";
import {map} from "rxjs";
import {dateToString, getTreeData} from "../../../shared/utils/tools";
import {MeService} from "../../../core/services/me.service";
import {TemplateRendererComponent} from "ngx-grid-table";
import {Role} from "../../../core/modal/me";
import {Tenement, TenementService} from "../../../core/services/tenement.service";


interface User {
  id: string;
  username: string;
  email: string;
  phone: string;

  tenementCode: string;
  tenementName: string;

  remark: string;

  userStatus: 0 | 1;

  createdBy: string;

  createdDate: number;

  updatedDate: number;

  updatedBy: string;


}

@Component({
  selector: 'naraka-cloud-web-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends AbstractGridTablePage implements OnInit {


  userApi = "/system/user";

  gridRequestUrl = "/system/user/page";

  assignRoleApi = "/system/user/role";
  getPhoneApi = "/system/user/phone";
  putPhoneApi = "/system/user/phone";
  restPasswordApi = "/system/user/password";
  getEmailApi = "/system/user/email";
  putEmailApi = "/system/user/email";

  gridOptions!: GridOptions;

  override transform: ParamsTransform = {
    status: (value) => ({type: "CONTAINS", filter: value}),
    createdTime: (value: Array<Date>) => [{
      type: "GE",
      filter: dateToString(value[0])
    }, {type: "LE", filter: dateToString(value[1])}]
  };

  searchFields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'grid-search-panel',
    fieldGroup: [
      {
        key: 'createdTime',
        type: 'date-range',
        props: {
          labelWidth: 80,
          ranges: this.crud.queryDateRanges(() => this.searchForm?.value['createdTime'])
        },
        expressions: {
          'templateOptions.label': this.translate.stream('common.createdTime'),
          'templateOptions.placeholder': this.translate.stream('common.createdTime'),
        },
      },
      {
        key: 'username',
        type: 'input',
        props: {

          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.username.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.username.placeholder'),
        },
      },
      {
        key: 'userStatus',
        type: 'select',
        props: {
          labelWidth: 80,
          allowClear: true,
          selectWidth: 150,

          options: [
            {label: this.translate.instant('common.enable'), value: 1},
            {label: this.translate.instant('common.disable'), value: 0}
          ]
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.userStatus.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.userStatus.placeholder'),
        },
      }
    ]
  }];

  @ViewChild("phoneTemplate", {static: true})
  phoneTemplate!: TemplateRef<any>;

  @ViewChild("emailTemplate", {static: true})
  emailTemplate!: TemplateRef<any>;
  @ViewChild("actionTemplate", {static: true})
  actionTemplate!: TemplateRef<any>;

  request = (params: QueryPage) => this.http.post<Page<User>>(this.gridRequestUrl, params);

  override getData = (params: QueryPage) => this.getDataUtils<User>(params, this.request, {createdTime: []});


  constructor(private modal: NzModalService,
              private http: HttpClient,
              private meService: MeService,
              private tenementService: TenementService,
              private validationMessageService: ValidationService,
              private crud: CrudHelperService,
              private translate: TranslateService) {
    super();

  }

  ngOnInit(): void {
    const columnDefs: ColDef[] = [
      {
        headerName: '', field: '_action',
        cellRenderer: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.actionTemplate
        }
      },
      {headerName: this.translate.instant('page.system.user.username.label'), field: 'username'},
      {
        headerName: this.translate.instant('page.system.user.email.label'), field: 'email',
        valueGetter: params => {
          if (params.data.email?.indexOf("**") < 0) {
            params.data.fullEmail = true;
          }
          return params.data.email;
        },
        cellRenderer: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.emailTemplate
        }
      },
      {
        headerName: this.translate.instant('page.system.user.phone.label'), field: 'phone', width: 140,
        cellRenderer: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.phoneTemplate
        }, valueGetter: params => {
          if (params.data.phone?.indexOf("**") < 0) {
            params.data.fullPhone = true;
          }
          return params.data.phone;
        },
      },
      {headerName: this.translate.instant('page.system.user.passwordExpireTime.label'), field: 'passwordExpireTime'},

      {headerName: this.translate.instant('page.system.user.type.label'), field: 'type'},
      {headerName: this.translate.instant('page.system.user.userStatus.label'), field: 'userStatus'},
      {headerName: this.translate.instant('page.system.tenement.name.label'), field: 'tenementName'},
      {headerName: this.translate.instant('common.remark'), field: 'remark'},
      {headerName: this.translate.instant('common.createdBy'), field: 'createdBy'},
      {headerName: this.translate.instant('common.createdTime'), field: 'createdTime', sortable: true},
      {headerName: this.translate.instant('common.updatedBy'), field: 'updatedBy'},
      {headerName: this.translate.instant('common.updatedTime'), field: 'updatedTime'}
    ]
    this.gridOptions = {
      getRowId: data => data.data.username,
      columnDefs: this.meService.filterColumnByPost(columnDefs, this.gridRequestUrl),
    }
  }


  seePhone(node: RowNode) {
    const username = node.data.username;
    const phone = node.data.phone;
    node.data.fullPhone = 'loading';
    this.http.get(this.getPhoneApi, {params: {username}}).subscribe({
      next: next => {
        node.data.fullPhone = true;
        node.setDataValue("phone", next);
      }, error: error => {
        node.data.fullPhone = false;
        node.setDataValue("phone", phone);
      }
    });
  }

  updatePhone(node: RowNode) {
    const id = node.data.id;
    const phone = node.data.phone;
    const fields: FormlyFieldConfig[] = [
      {
        key: 'phone',
        type: 'input',
        defaultValue: /\*/.test(phone) ? '' : phone,
        props: {
          labelWidth: 80,
          required: true,
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          phone: this.validationMessageService.phone()
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.phone.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.phone.placeholder'),
        }
      }
    ];
    this.crud.createCommonModal<Partial<User>,Partial<User>>(this.translate.instant('page.system.user.updatePhone'), fields, (data) =>
      this.http.put<string>(this.putPhoneApi, Object.assign({id}, data)).pipe(map(() => data)))
      .subscribe((next) => {
        next && node.setDataValue("phone", next.phone);
      });
  }

  seeEmail(node: RowNode) {
    const username = node.data.username;
    const phone = node.data.email;
    node.data.fullEmail = 'loading';
    this.http.get(this.getEmailApi, {params: {username}}).subscribe({
      next: next => {
        node.data.fullEmail = true;
        node.setDataValue("email", next);
      },
      error: error => {
        node.data.fullEmail = false;
        node.setDataValue("email", phone);
      }
    });
  }

  updateEmail(node: RowNode) {
    const id = node.data.id;
    const email = node.data.email;
    const fields: FormlyFieldConfig[] = [
      {
        key: 'email',
        type: 'input',
        defaultValue: /\*/.test(email) ? '' : email,
        props: {
          labelWidth: 80,
          required: true,
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          email: this.validationMessageService.email()
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.email.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.email.placeholder'),
        }
      }
    ];
    this.crud.createCommonModal<User,any>(this.translate.instant('page.system.user.updateEmail'), fields, (data) =>
      this.http.put<string>(this.putEmailApi, Object.assign({id}, data)).pipe(map(() => data)))
      .subscribe({
        next: next => {
          next && node.setDataValue("email", next.email);
        }
      });
  }


  restPwd(data: User) {


  }

  assignRole(node: PageItem) {
    const userId = node['id'];
    const roleCode$ =
      this.http.get<Array<Role>>(this.assignRoleApi, {params: {userId: userId}})
        .pipe(map(next => next.map(item => item.code)));
    const serverSearch = (name: string) => this.http.post<Page<PageItem>>("/system/role/page",
      new QueryPage(1, 500, name ? {name: {type: 'LIKE', filter: name}} : {}))
      .pipe(map(page => page.items || []), map(items => items.map(item => ({
        label: item['name'],
        value: item['code']
      }))));
    const fields: FormlyFieldConfig[] = [
      {
        key: 'roles',
        type: 'select',
        props: {
          labelWidth: 80,
          selectWidth: 250,
          required: true,
          mode: 'multiple',
          showSearch: true,
          serverSearch,
          defaultValue: roleCode$,
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        expressions: {
          'props.label': this.translate.stream('page.system.user.role.label'),
          'props.placeholder': this.translate.stream('page.system.user.role.placeholder'),
        }
      }
    ];

    this.crud.createCommonModal(this.translate.instant('page.system.user.assign'), fields, (data) =>
      this.http.post<Page<PageItem>>(this.assignRoleApi, Object.assign({userId}, data)).pipe(map(() => true)))
      .subscribe((next) => {
        next && this.gridTable?.searchRowsData();
      });

  }

  create() {
    const nodes = this.tenementService.getList({})
      .pipe(map((items: Tenement[]) => {
        const tree = getTreeData(items.map(item => Object.assign({key: item.code, title: item.name}, item)), {
          parent: (item) => item.parentCode,
          id: (item) => item.code,
          isRoot: (item) => !item.parentCode
        });
        return tree;

      }));
    const fields: FormlyFieldConfig[] = [{
      key: 'username',
      type: 'input',
      props: {
        required: true,
        labelWidth: 80,
      },
      validation: {
        messages: {
          required: this.validationMessageService.requiredMessage
        }
      },
      validators: {
        username: this.validationMessageService.username()
      },
      expressions: {
        'templateOptions.label': this.translate.stream('page.system.user.username.label'),
        'templateOptions.placeholder': this.translate.stream('page.system.user.username.placeholder'),
      },
    },
      {
        key: 'password',
        type: 'input',
        props: {
          required: true,
          labelWidth: 80,

        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.password.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.password.placeholder'),
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          password: this.validationMessageService.password()
        }
      },
      {
        key: 'phone',
        type: 'input',
        props: {
          required: true,
          labelWidth: 80,
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          phone: this.validationMessageService.phone()
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.phone.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.phone.placeholder'),
        },
      },
      {
        key: 'email',
        type: 'input',
        props: {
          required: true,
          labelWidth: 80
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          email: this.validationMessageService.email()
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.email.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.email.placeholder'),
        }
      },
      {
        key: 'tenementCode',
        type: 'tree-select',
        props: {
          labelWidth: 80,
          selectWidth: '100%',
          nzAllowClear: false,
          required: true,
          showSearch: true,
          nodes
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        expressions: {
          'props.label': this.translate.stream('page.system.tenement.name.label'),
          'props.placeholder': this.translate.stream('page.system.tenement.name.placeholder'),
        }
      },
      {
        key: 'userStatus',
        type: 'select',
        defaultValue: 1,
        props: {
          labelWidth: 80,
          required: true,
          selectWidth: '100%',
          options: [
            {label: this.translate.instant('common.enable'), value: 1},
            {label: this.translate.instant('common.disable'), value: 0}
          ]
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.userStatus.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.userStatus.placeholder'),
        }
      }]
    this.crud.createCommonModal(this.translate.instant('page.system.user.create'), fields, (data) =>
      this.http.post<Page<PageItem>>(this.userApi, data).pipe(map(() => true)))
      .subscribe((next) => {
        next && this.gridTable?.searchRowsData();
      });

  }


  updateProfile(node: User) {

    const fields: FormlyFieldConfig[] = [
      {
        key: 'username',
        type: 'input',
        props: {
          disabled:true,
          required: true,
          labelWidth: 80,
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          username: this.validationMessageService.username()
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.username.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.username.placeholder'),
        },
      },
      {
        key: 'id',
        type: 'input',
        hide:true,
        props: {

          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.username.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.username.placeholder'),
        },
      },
      {
        key: 'userStatus',
        type: 'select',
        props: {
          labelWidth: 80,
          required: true,
          selectWidth: '100%',
          options: [
            {label: this.translate.instant('common.enable'), value: 1},
            {label: this.translate.instant('common.disable'), value: 0}
          ]
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.userStatus.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.userStatus.placeholder'),
        }
      },
      {
        key: 'remark',
        type: 'input',
        props: {
          required: false,
          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('common.remark.label'),
          'templateOptions.placeholder': this.translate.stream('common.remark.label'),
        },
      },
    ]
    this.crud.createCommonModal<User,User>(this.translate.instant('page.system.user.update'), fields, (data) =>
      this.http.put<Page<User>>(this.userApi, data).pipe(map(() => true)), node)
      .subscribe((next) => {
        next && this.gridTable?.searchRowsData();
      });
  }

  restPassword(node:User){
    const fields: FormlyFieldConfig[] = [
      {
        key: 'username',
        type: 'input',
        props: {
          disabled:true,
          required: true,
          labelWidth: 80,
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          username: this.validationMessageService.username()
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.username.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.username.placeholder'),
        },
      },
      {
        key: 'id',
        type: 'input',
        hide:true,
        props: {

          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.username.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.username.placeholder'),
        },
      },
      {
        key: 'newPassword',
        type: 'input',
        props: {
          required: true,
          labelWidth: 80,

        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.user.password.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.user.password.placeholder'),
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          newPassword: this.validationMessageService.password()
        }
      },

    ]
    this.crud.createCommonModal<User,User>(this.translate.instant('page.system.user.update'), fields, (data) =>
      this.http.put<Page<User>>(this.restPasswordApi, {...data,id:node.id}).pipe(map(() => true)), node)
      .subscribe((next) => {
        next && this.gridTable?.searchRowsData();
      });
  }
}
