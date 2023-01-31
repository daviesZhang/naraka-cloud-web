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
import {Tenement, TenementService} from "@core/services/tenement.service";


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


  @ViewChild("cellButton", {static: true})
  cellButton!: TemplateRef<any>;
  request = (params: QueryPage) => this.tenementService.getList(params)
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
              private tenementService: TenementService,
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
      getRowId: data => data.data.code,
      getDataPath: data => data.path,
      groupDisplayType: 'custom',
      columnDefs: [
        {
          headerName: '',
          field: '_action',
          cellRenderer: TemplateRendererComponent,
          suppressMenu: true,
          cellRendererParams: {
            ngTemplate: this.cellButton
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

  create(parentCode = null) {
    this.crud.createCommonModal<any,Partial<Tenement>>(this.translate.instant('common.create'),
      this.createFields(),
      data => this.tenementService.create(Object.assign({},data, {parentCode})))
      .subscribe(next => next && this.search())
  }

  update(value: Tenement) {
    const {code} = value;
    this.crud.createCommonModal(this.translate.instant('common.update'),
      this.createFields(),
      data => this.tenementService.update(Object.assign({code}, data)))
      .subscribe(next => next && this.refresh());
  }


  delete(code: string) {
    this.crud.simpleDeleteConfirmModal(
      () => this.tenementService.deleteByCode(code))
      .subscribe(() => this.search());
  }
}
