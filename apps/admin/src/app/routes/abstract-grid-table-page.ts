import {GridTableComponent, GridTableReadyEvent, Page, RequestData} from "ngx-grid-table";
import {JsonFormComponent} from "@shared/json-form/json-form.component";
import {ParamsTransform, QueryPage, QueryParams} from "@core/modal/query";
import {mergeQueryParams, transformQueryParams} from "@shared/utils/tools";
import {Observable} from "rxjs";
import {PageItem} from "@core/modal/page";
import {ColDef} from "ag-grid-community";

export abstract class AbstractGridTablePage {

  protected searchForm?: JsonFormComponent;

  protected gridTable?: GridTableComponent;

  /**
   * 数据转换方法,查询form数据转换为查询数据结构的方法
   * @protected
   */
  protected transform: ParamsTransform = {};

  /**
   * 表格数据请求方法
   */
  abstract request: RequestData<any, QueryPage>;

  getData = (params: QueryPage) => this.getDataUtils<PageItem>(params, this.request);

  onGridReady(event: GridTableReadyEvent, jsonForm?: JsonFormComponent) {
    this.gridTable = event.gridTable;
    this.searchForm = jsonForm;
  }


  /**
   * getData的帮助方法,转换查询参数
   * @param queryPage
   * @param transform
   * @param getData
   * @param queryParams
   */
  getDataUtils = <T>(queryPage: QueryPage, getData: RequestData<T, QueryPage>, queryParams?: QueryParams): Observable<Page<T>> => {
    if (queryParams) {
      mergeQueryParams(queryPage.query, queryParams);
    }
    if (this.searchForm) {
      mergeQueryParams(queryPage.query, transformQueryParams(this.searchForm.value, this.transform));
    }
    return getData(queryPage);
  }


  static filterColumnDefs(colDefs: ColDef[], resource: string, authority?: Map<string, Array<string>>): ColDef[] {
    if (!authority) {
      return colDefs;
    }
    const filter = authority.get(resource);
    if (filter && filter.length) {
      return colDefs.filter(column => {
        return !column.field || filter.indexOf(column.field) < 0;
      });
    }
    return colDefs;

  }




}
