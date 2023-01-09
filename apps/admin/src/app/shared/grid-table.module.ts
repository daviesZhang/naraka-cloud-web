import {NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridTableConfig, NgxGridTableModule, NgxGridTableTranslateService, RequestDataParams} from "ngx-grid-table";
import {SharedModule} from "@shared/shared.module";
import {GridTranslateService} from "@core/services/grid-translate.service";
import {ParamsTransform, QueryPage, QueryParams} from "@core/modal/query";
import {getOrderParams, mergeQueryParams} from "@shared/utils/tools";


/**
 * 手动注入一个表格的翻译服务,替代默认的,因为项目已经用了国际化模块,整合到一起
 * 如果项目未使用国际化
 * 使用默认的翻译服务需要在第一次使用GridTable前调用NgxGridTableTranslateService#setI18nText,传入翻译文本对象
 *
 */
const GRIDI18NSERVICE_PROVIDES: Provider[] = [
  {
    provide: NgxGridTableTranslateService,
    useClass: GridTranslateService
  }
]
export const config: GridTableConfig =
  {
    dataParams: (params: RequestDataParams): QueryPage => {
      const {current, size, orderBys, ...other} = params;
      let queryParams = new QueryParams();
      if (orderBys) {
        queryParams = getOrderParams(orderBys);
      }
      return Object.assign(new QueryPage(current, size, queryParams), other);
    }

  }


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NgxGridTableModule.forRoot(config),
  ], providers: [
    ...GRIDI18NSERVICE_PROVIDES
  ],
  exports: [
    NgxGridTableModule
  ]
})
export class GridTableModule {
}
