import {Injectable, TemplateRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {CommonModalComponent} from "@shared/common-modal/common-modal/common-modal.component";
import {filter, firstValueFrom, map, Observable, Subject, tap} from "rxjs";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {ModalOptions} from "ng-zorro-antd/modal/modal-types";
import {TranslateService} from "@ngx-translate/core";
import {FormlyValueChangeEvent} from "@ngx-formly/core/lib/models/fieldconfig";
import {addMonths, endOfMonth, endOfToday, endOfWeek, startOfMonth, startOfToday, startOfWeek} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class CrudHelperService {


  constructor(private modal: NzModalService, private translate: TranslateService) {


  }

  /**
   * range查询时间区间
   * @param getSelect 获取当前选择的时间,如果提供这个方法,增加一个动态获取上个月区间的按钮
   */
  queryDateRanges(getSelect?: () => Array<Date> | null) {
    const now = new Date();
    let range = {
      [this.translate.instant('common.today')]: [startOfToday(), endOfToday()],
      [this.translate.instant('common.week')]: [startOfWeek(now), endOfWeek(now)],
      [this.translate.instant('common.month')]: [startOfMonth(now), endOfMonth(now)],
      [this.translate.instant('common.lastMonth')]: [addMonths(startOfMonth(now), -1), endOfMonth(addMonths(now, -1))],
    };
    if (getSelect) {
      Object.assign(range, {
        [this.translate.instant('common.previousMonth')]: () => {
          let select = now;
          if (getSelect) {
            const range = getSelect();
            if (range && range.length > 0) {
              select = range[0];
            }
          }
          const lastMoth = addMonths(select, -1);
          return [startOfMonth(lastMoth), endOfMonth(lastMoth)];
        }
      });
    }
    return range;
  }


  /**
   * 当modal被关闭时,返回值Observable会发出唯一值,结果为true则表示顺利执行后关闭,false表示手动销毁,没有执行请求
   * @param title modal标题
   * @param content modal内容
   * @param request 请求方法
   * @param data 默认数据
   */
  createCommonModal(title: string,
                    content: FormlyFieldConfig[] | string | TemplateRef<NzSafeAny>,
                    request: (data: any) => Observable<any>,
                    data?: any): Observable<any> {

    return this.modal.create({
      nzTitle: title,
      nzContent: CommonModalComponent,
      nzComponentParams: {
        content,
        request,
        data
      },
      nzFooter: null,
    }).afterClose.asObservable();
  }


  /**
   * 当modal被关闭时,返回值Observable会发出唯一值,结果为true则表示顺利执行后关闭,false表示手动销毁,没有执行请求
   * @param title modal标题
   * @param content modal内容
   * @param request 请求方法
   * @param data 默认数据
   */
  createConfirmModal(title: string,
                     content: FormlyFieldConfig[] | string | TemplateRef<NzSafeAny>,
                     request: (data: any) => Observable<any>, data?: any): Observable<any> {
    const options: ModalOptions = {
      nzTitle: title,
      nzContent: CommonModalComponent,
      nzComponentParams: {
        content,
        data,
        request,
        showFooter: false
      },
      nzOnOk: () => firstValueFrom(request(null)),

    };

    return this.modal.confirm(options).afterClose.asObservable();
  }


  /**
   * 简单删除确认框,当删除成功后Observable才会发出值
   * @param request
   */
  simpleDeleteConfirmModal(request: (data: any) => Observable<any>): Observable<any> {
    const options: ModalOptions = {
      nzTitle: this.translate.instant('common.delete'),
      nzContent: CommonModalComponent,
      nzComponentParams: {
        content: this.translate.instant('common.deleteConfirm'),
        request,
        showFooter: false
      },
      nzOnOk: () => firstValueFrom(request(null).pipe(map(next => (next === null || next === undefined) ? true : next))),
    };
    return this.modal.confirm(options).afterClose.asObservable().pipe(filter(next => !!next));
  }
}
