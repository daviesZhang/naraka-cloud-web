import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class GridTranslateService {

  constructor(private i18n: TranslateService) {
  }

  translate(key: string, interpolateParams?: {}) {
    return this.i18n.instant(`ngxGridTable.${key}`, interpolateParams);
  }
}
