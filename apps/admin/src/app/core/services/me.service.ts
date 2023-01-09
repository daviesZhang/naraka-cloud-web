import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap, zip} from "rxjs";
import {CurrentUser, ICurrentUser} from "@core/modal/me";
import {ColDef} from "ag-grid-community";


@Injectable({
  providedIn: 'root'
})
export class MeService {

  me$ = new BehaviorSubject<CurrentUser | null>(null);

  constructor(private httpClient: HttpClient) {
  }


  me(): Observable<CurrentUser> {
    return zip(this.httpClient.get("/system/menu/own"),
      this.httpClient.get<ICurrentUser>('/system/user/me'))
      .pipe(map(([menus, user]) => {
          return new CurrentUser(Object.assign({menus}, user));
        }
      ), tap(next => this.me$.next(next)));
  }

  hasRole(resource: string): boolean {
    const user = this.me$.getValue();
    if (!user) {
      return false;
    }
    return user.roles.some(role => role.code === resource);
  }


  hasResource(resource: string): boolean {
    const user = this.me$.getValue();
    if (!user) {
      return false;
    }
    return user.resource.has(resource);
  }

  hasResourceByGet(resource: string): boolean {
    return this.hasResource("get " + resource);
  }

  hasResourceByPost(resource: string): boolean {
    return this.hasResource("post " + resource);
  }

  hasResourceByPut(resource: string): boolean {
    return this.hasResource("put " + resource);
  }

  hasResourceByDelete(resource: string): boolean {
    return this.hasResource("delete " + resource);
  }

  filterColumn(colDefs: ColDef[], resource: string): ColDef[] {
    const user = this.me$.getValue();
    if (!user) {
      return colDefs;
    }
    const authority = user.resource;
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


  filterColumnByGet(colDefs: ColDef[], resource: string): ColDef[] {
    return this.filterColumn(colDefs, "get " + resource);

  }

  filterColumnByPost(colDefs: ColDef[], resource: string): ColDef[] {
    return this.filterColumn(colDefs, "post " + resource);

  }
}
