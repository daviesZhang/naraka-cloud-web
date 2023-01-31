import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

export interface Tenement {
  code: string;
  name: string;
  parentCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenementService {

  queryListApi = "/system/tenement/list";
  api = "/system/tenement";
  deleteApi = "/system/tenement/delete";

  constructor(private httpClient: HttpClient) {
  }


  getList(params: unknown): Observable<Array<Tenement>> {
    return this.httpClient.post<Array<Tenement>>(this.queryListApi, params);
  }
  create(params: Partial<Tenement>): Observable<Tenement> {
    return this.httpClient.post<Tenement>(this.api,
      params);

  }


  update(params: Partial<Tenement>): Observable<boolean> {
    return this.httpClient.put(this.api,
      params).pipe(map(() => true));
  }

  deleteByCode(code: string): Observable<boolean> {
    const params = new HttpParams();
    params.set(code, code);
    return this.httpClient.post(`${this.deleteApi}`, params)
      .pipe(map(next => true));
  }

}
