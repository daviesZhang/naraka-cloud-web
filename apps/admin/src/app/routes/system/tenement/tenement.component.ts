import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {QueryPage} from '../../../core/modal/query';

import {map} from 'rxjs';
import {AbstractGridTablePage} from "../../abstract-grid-table-page";
import {HttpClient} from "@angular/common/http";
import {GridOptions} from "ag-grid-community";
import {ValidationService} from "../../../core/services/validation.service";
import {CrudHelperService} from "../../../core/services/crud-helper.service";
import {TranslateService} from "@ngx-translate/core";
import {changeDataToGridTree} from "../../../shared/utils/tools";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {NzModalService} from "ng-zorro-antd/modal";
import {TemplateRendererComponent} from "ngx-grid-table";


interface Tenement {
  code: string;
  name: string;
  parentCode: string;
}

@Component({
  selector: 'naraka-cloud-web-tenement',
  templateUrl: './tenement.component.html',
  styleUrls: ['./tenement.component.scss'],
})
export class TenementComponent extends AbstractGridTablePage implements OnInit {


  queryListApi = "/system/tenement/list";
  api = "/system/tenement";
  deleteApi = "/system/tenement/delete";

  searchFields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'grid-search-panel',
    fieldGroup: [
      {
        key: 'code',
        type: 'input',
        props: {
          label: 'Code',
          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.tenement.code.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.tenement.code.placeholder'),
        },
      },
      {
        key: 'name',
        type: 'input',
        props: {
          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.tenement.name.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.tenement.name.placeholder'),
        },
      }
    ]
  }];

  gridOptions!: GridOptions;


  @ViewChild("cellButton",{static: true})
  cellButton!: TemplateRef<any>;
  request = (params: QueryPage) => this.httpClient.post<Array<Tenement>>(this.queryListApi, params)
    .pipe(map(items => {
      return {
        items: changeDataToGridTree(items, {parent: item => item.parentCode, id: item => item.code}),
        total: items.length
      }
    }));

  constructor(private httpClient: HttpClient,
              private validationMessageService: ValidationService,
              private crud: CrudHelperService,
              private modal: NzModalService,
              private translate: TranslateService) {
    super();
  }

  private createFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'code',
        type: 'input',
        props: {
          label: 'Code',
          labelWidth: 80,
          required: true
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage
          }
        },
        validators: {
          // username:this.validationMessageService.username()
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.tenement.code.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.tenement.code.placeholder'),
        }
      },
      {
        key: 'name',
        type: 'input',
        props: {
          labelWidth: 80,
          required: true,
        },
        validation: {
          messages: {
            required: this.validationMessageService.requiredMessage,
          }
        },

        expressions: {
          'templateOptions.label': this.translate.stream('page.system.tenement.name.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.tenement.name.placeholder'),
        },
      },
      {
        key: 'desc',
        type: 'input',
        props: {
          labelWidth: 80,
        },
        expressions: {
          'templateOptions.label': this.translate.stream('page.system.tenement.desc.label'),
          'templateOptions.placeholder': this.translate.stream('page.system.tenement.desc.placeholder'),
        },
      }
    ];
  }

  ngOnInit(): void {
    this.gridOptions = {
      treeData: true,
      getRowId:data=>data.data.code,
      getDataPath: data => data.path,
      groupDisplayType: 'custom',
      columnDefs: [
        {
          headerName:'',
          field: '_action',
          cellRenderer: TemplateRendererComponent,
          suppressMenu:true,
          cellRendererParams:{
            ngTemplate:this.cellButton
          },
          pinned: 'left'
        },
        {
          headerName: this.translate.instant('page.system.tenement.name.label'),
          field: 'name',
          cellRenderer: 'agGroupCellRenderer',
          showRowGroup: true
        },
        {headerName: this.translate.instant('page.system.tenement.code.label'), field: 'code'},
        {headerName: this.translate.instant('page.system.tenement.desc.label'), field: 'desc'},
        {headerName: this.translate.instant('common.createdBy'), field: 'createdBy'},
        {headerName: this.translate.instant('common.createdTime'), field: 'createdDate'},
        {headerName: this.translate.instant('common.updatedBy'), field: 'updatedBy'},
        {headerName: this.translate.instant('common.updatedTime'), field: 'updatedDate'}
      ]
    }
  }

  search() {
    if (this.gridTable) {
      this.gridTable.searchRowsData(this.searchForm?.value);
    }
  }
  refresh() {
    if (this.gridTable) {
      this.gridTable.refreshRowsData(this.searchForm?.value);
    }
  }

  create(parentCode =null) {
    this.crud.createCommonModal(this.translate.instant('common.create'),
      this.createFields(),
      data => this.httpClient.post(this.api,
        Object.assign(data, {parentCode})).pipe(map(() => true)))
      .subscribe(next => next && this.search())
  }

  update(value: { [key: string]: any }) {
    this.crud.createCommonModal(this.translate.instant('common.update'),
      this.createFields(),
      data => this.httpClient.put(this.api,
        Object.assign({id: value['id']}, data)).pipe(map(() => true)), value)
      .subscribe(next => next && this.refresh());
  }


  delete(parent: string) {
    this.crud.simpleDeleteConfirmModal(
      () => this.httpClient.post(`${this.deleteApi}?code=${parent}`,{}).pipe(map(() => true)))
      .subscribe(() => this.search());
  }
}
