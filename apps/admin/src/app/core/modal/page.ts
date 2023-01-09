export type PageItem={ [key: string]: any;}

export interface Page<T>{
  current: number;
  total: number;
  size: number;
  items: Array<T>;
}

export class PageImpl<T> implements Page<T>{
  current: number;
  items: Array<T>;
  size: number;
  total: number;


  constructor(init: { current: number, items: Array<T>, size: number, total: number }) {
    this.current = init.current;
    this.items = init.items || [];
    this.size = init.size;
    this.total = init.total;
  }
}
