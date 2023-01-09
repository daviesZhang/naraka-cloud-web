import {TemplateRef} from '@angular/core';
import {RowNode} from 'ag-grid-community';
import {Observable} from "rxjs";

export interface Page<T>{
  total: number;
  items: Array<T>;
  statistics?: Array<Statistics>;
}

export interface OrderBy{
  [key: string]: 'order' | 'asc';
}
export interface RequestDataParams {
  size?: number;
  current?:number;
  orderBys?: OrderBy;
  [key: string]: unknown;
}


export type RequestDelete= (node: RowNode) => Observable<void>




export interface Statistics {
  key: string,
  label?: string,
  skipExport?: boolean,
  className?: string,
  data: Array<{ key: string, label?: string, value: any, className?: string }>;
}

export interface RowButton{
  template: TemplateRef<any>;
  headerName?: string;
  first?: boolean;
}
