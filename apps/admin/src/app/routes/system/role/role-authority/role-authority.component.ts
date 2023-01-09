import {Component, Input, OnInit} from '@angular/core';
import {AbstractGridTablePage} from "../../../abstract-grid-table-page";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {RequestDataType, SimpleGridTablePagination} from "ngx-grid-table";
import {QueryPage} from "../../../../core/modal/query";
import {Observable} from "rxjs";
import {Page, PageItem} from "../../../../core/modal/page";
import {ColDef, GridOptions} from "ag-grid-community";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {CrudHelperService} from "../../../../core/services/crud-helper.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'naraka-cloud-web-role-authority',
  templateUrl: './role-authority.component.html',
  styleUrls: ['./role-authority.component.scss']
})
export class RoleAuthorityComponent extends AbstractGridTablePage implements OnInit {

  searchFields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'grid-search-panel',
    fieldGroup: [

      {
        key: 'resource',
        type: 'input',
        props: {

          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.authority.resource.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.authority.resource.placeholder'),
        },
      },
      {
        key: 'resourceType',
        type: 'select',
        props: {
          labelWidth: 80,
          allowClear: true,
          selectWidth: 150,

          options: [
            {label: this.translate.instant('page.system.authority.resourceType.0'), value: 0},
            {label: this.translate.instant('page.system.authority.resourceType.1'), value: 1}
          ]
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.authority.resourceType.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.authority.resourceType.placeholder'),
        },
      },
      {
        key: 'processor',
        type: 'select',
        props: {
          labelWidth: 80,
          allowClear: true,
          selectWidth: 150,
          options: [
            {label: this.translate.instant('page.system.authority.processor.0'), value: 0},
            {label: this.translate.instant('page.system.authority.processor.1'), value: 1}
          ]
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.authority.processor.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.authority.processor.placeholder'),
        },
      }
    ]
  }];


  @Input()
  roleCode!: string;

  @Input()
  showAuthorityApi!: string;

  simpleGridTablePagination = new SimpleGridTablePagination()

  gridOptions!: GridOptions;

  assign = true;

  loading: { [key: number]: boolean | 'end'; } = {};

  assignApi = '/system/role/assign';
  unAssignApi = '/system/role/unAssign';


  constructor(private http: HttpClient, private translate: TranslateService,
              private message: NzMessageService,
              private helper: CrudHelperService) {
    super();
  }


  ngOnInit(): void {
    const columnDefs: ColDef[] = [
      {headerName: this.translate.instant('page.system.authority.resource.label'), field: 'resource'},
      {
        headerName: this.translate.instant('page.system.authority.resourceType.label'), field: 'resourceType',
        valueGetter: (params) => this.translate.instant('page.system.authority.resourceType.' + params.data.resourceType)
      },
      {
        headerName: this.translate.instant('page.system.authority.processor.label'), field: 'processor',
        valueGetter: (params) => typeof params.data.processor === "number" ?
          this.translate.instant('page.system.authority.processor.' + params.data.processor) : ''
      },
      {
        headerName: this.translate.instant('page.system.authority.processorValue.label'),
        flex: 1,
        field: 'processorValue'
      },
      {headerName: this.translate.instant('common.remark'), field: 'remark',}
    ];
    this.gridOptions = {
      columnDefs: columnDefs,
      sideBar: undefined,
    }
  }

  request = (params: RequestDataType<QueryPage>): Observable<Page<PageItem>> => {
    this.loading = {};
    Object.assign(params.query, {roleCode: this.roleCode,assign:this.assign })
    return this.http.post<Page<PageItem>>(this.showAuthorityApi, params);
  }





  onAssignChange(value: any) {
    this.assign = value;
    this.gridTable?.searchRowsData();

  }

  onAssign(node: PageItem) {
    const id = node['id'];
    Object.assign(this.loading, {[id]: true});
    this.http.post(this.assignApi, {authority: node['id'], code: this.roleCode})
      .subscribe({
        next: next => Object.assign(this.loading, {[id]: 'end'})
        , error: error => {
          this.message.error("授权时遇到错误,请稍后重试~");
          Object.assign(this.loading, {[id]: false});
        }
      })
  }

  onUnAssign(node: PageItem) {
    const id = node['id'];
    Object.assign(this.loading, {[id]: true});
    this.http.post(this.unAssignApi, {authority: node['id'], code: this.roleCode})
      .subscribe({
        next: next => Object.assign(this.loading, {[id]: 'end'})
        , error: error => {
          this.message.error("取消授权时遇到错误,请稍后重试~");
          Object.assign(this.loading, {[id]: false});
        }
      })
  }
}
