import {InjectionToken, TemplateRef} from "@angular/core";
import {RequestDataParams} from "./api";
import {SideBarDef,ColDef} from "ag-grid-community";


export interface GridTablePagination {
  size: 'small' | 'default',
  initIndex: number,
  showSizeChanger: boolean,
  showQuickJumper: boolean,
  simple: boolean,
  showTotal?: TemplateRef<{ $implicit: number, range: [number, number] }>|null;
  pageSizeOptions?: Array<number>;
  initPageSize: number;
}

export class DefaultGridTablePagination implements GridTablePagination {
  size: "small" | "default" = "small";
  initIndex = 1;
  showSizeChanger = true;
  showQuickJumper = true;
  simple = false;
  pageSizeOptions: Array<number> = [100, 300, 500, 900];
  initPageSize: number = 100;
}

export class SimpleGridTablePagination implements GridTablePagination {

  initIndex = 1;
  showSizeChanger = false;
  showQuickJumper = false;
  simple = true;
  size: "small" | "default" = "small";
  pageSizeOptions: Array<number> = [100, 300, 500, 900];
  initPageSize: number = 100;
  showTotal = null;
}


export interface GridTableConfig {
  dataParams: (params: RequestDataParams) => unknown,
  sideBar?: SideBarDef | string | boolean | null,
  defaultColDef?: ColDef;
  gridTablePagination?: GridTablePagination | false;
}


export class DefaultNgxGridTableConfig implements GridTableConfig {
  dataParams: (params: RequestDataParams) => RequestDataParams = params => params;
  sideBar?: SideBarDef | string | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'columns',
        labelKey: 'columnsTools',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: false,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressSideButtons: false,
          suppressColumnFilter: false,
          suppressColumnSelectAll: false,
          suppressColumnExpandAll: false
        }
      }
    ]
  };
  gridTablePagination = new DefaultGridTablePagination();
  defaultColDef?: ColDef = {resizable: true};
}

export const GRID_TABLE_CONFIG = new InjectionToken<DefaultNgxGridTableConfig>('ngx-grid-table.config');



