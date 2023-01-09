import {Component, Input, OnInit} from '@angular/core';
import {AbstractGridTablePage} from "../../abstract-grid-table-page";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {CrudHelperService} from "@core/services/crud-helper.service";
import {GridTablePagination, RequestData, RequestDataType, RowButton} from 'ngx-grid-table';
import {QueryPage} from '@core/modal/query';
import {map, Observable} from 'rxjs';
import {Page, PageItem} from '@core/modal/page';

import {FormlyFieldConfig} from "@ngx-formly/core";
import {ColDef, GridOptions, SideBarDef} from "ag-grid-community";
import {ValidationService} from "@core/services/validation.service";


@Component({
  selector: 'naraka-cloud-web-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent extends AbstractGridTablePage implements OnInit {

  gridOptions: GridOptions = {};

  createApi = "/system/authority";
  deleteApi = "/system/authority/delete";
  updateApi = "/system/authority";
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


  request: RequestData<any, QueryPage> = (params: RequestDataType<QueryPage>): Observable<Page<PageItem>> => {
    return this.http.post<Page<PageItem>>("/system/authority/page", params);
  };


  @Input()
  columnDefs: ColDef[] = [
    {headerName: this.translate.instant('page.system.authority.resource.label'), field: 'resource'},
    {headerName: this.translate.instant('page.system.authority.resourceType.label'), field: 'resourceType'},
    {headerName: this.translate.instant('page.system.authority.processor.label'), field: 'processor'},
    {headerName: this.translate.instant('page.system.authority.processorValue.label'), field: 'processorValue'},
    {headerName: this.translate.instant('common.remark'), field: 'remark'},
    {headerName: this.translate.instant('common.createdBy'), field: 'createdBy'},
    {headerName: this.translate.instant('common.createdTime'), field: 'createdTime', sortable: true},
    {headerName: this.translate.instant('common.updatedBy'), field: 'updatedBy'},
    {headerName: this.translate.instant('common.updatedTime'), field: 'updatedTime'}
  ];


  constructor(private http: HttpClient,
              private translate: TranslateService,
              private validationService: ValidationService,
              private helper: CrudHelperService) {
    super();
  }


  ngOnInit(): void {

    this.gridOptions = {
      columnDefs: this.columnDefs,

    }
  }


  create() {
    this.helper.createCommonModal(this.translate.instant('common.create'),   this.commonFields(),
      params => this.http.post(this.createApi, params))
      .subscribe((next) => {
        next && this.gridTable?.searchRowsData();
      });
  }

  delete(id:Array<number>) {
    this.helper.simpleDeleteConfirmModal(() => this.http.post(this.deleteApi, id))
      .subscribe((next) =>  next && this.gridTable?.searchRowsData());
  }


  update(data:PageItem){

    this.helper.createCommonModal(this.translate.instant('common.update'),
      this.commonFields(),
      value => this.http.put(this.updateApi,
        Object.assign({id: data['id']}, value)), data)
      .subscribe(next => next && this.gridTable?.refreshRowsData());
  }


  commonFields():FormlyFieldConfig[]{
    return [
      {
        key: 'name',
        type: 'input',
        props: {
          labelWidth: 80,
          required: true
        },
        validation: {
          messages: {
            required: this.validationService.requiredMessage
          }
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.authority.name.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.authority.name.placeholder'),
        },
      },
      {
        key: 'resource',
        type: 'input',
        props: {
          labelWidth: 80,
          required: true
        },
        validation: {
          messages: {
            required: this.validationService.requiredMessage
          }
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.authority.resource.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.authority.resource.placeholder'),
        },
      },
      {
        key: 'resourceType',
        type: 'select',
        defaultValue: 0,
        props: {
          labelWidth: 80,
          selectWidth: 150,
          required: true,
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
          allowClear: true,
          labelWidth: 80,
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
      },
      {
        key: 'processorValue',
        type: 'input',
        props: {
          labelWidth: 80,
        },
        validation: {
          messages: {}
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.authority.processorValue.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.authority.processorValue.placeholder'),
        },
      },
      {
        key: 'remark',
        type: 'input',
        props: {
          labelWidth: 80,
        },
        validation: {
          messages: {
            required: this.validationService.requiredMessage
          }
        },
        expressions: {
          'templateOptions.label': this.translate.stream('common.remark'),
          'templateOptions.placeholder': this.translate.stream('common.remark'),
        },
      },
    ];
  }
}
