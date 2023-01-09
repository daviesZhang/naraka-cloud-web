import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';


import {environment} from '@env/environment';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzMessageService} from "ng-zorro-antd/message";
import {TokenService} from "@core/services/token.service";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {LoginModalComponent} from "@shared/components/login-modal/login-modal.component";

const CODEMESSAGE: { [key: string]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
              private tokenService: TokenService,
              private httpClient: HttpClient) {
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private get modalService(): NzModalService {
    return this.injector.get(NzModalService);
  }

  private get messageService(): NzMessageService {
    return this.injector.get(NzMessageService);
  }


  private goTo(url: string) {
    this.injector.get(Router).navigateByUrl(url).then();
  }

  private checkStatus(ev: HttpResponseBase) {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    let errortext = CODEMESSAGE[ev.status] || ev.statusText;
    if (ev instanceof HttpErrorResponse) {
      if (ev.error&&ev.error.message){
        errortext = ev.error.message;
        this.messageService.error(errortext);
        return;
      }
    }
    this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(ev: HttpResponseBase, next?: HttpHandler, req?: HttpRequest<any>): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    if (ev.status > 0) {

    }
    this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        if (ev instanceof HttpResponse) {
          const token = ev.headers.get(this.tokenService.header_token_name);
          if (token) {
            this.tokenService.saveToken(token);
          }
          const body: any = ev.body;
          if (!body || body.code === undefined) {
            return of(ev);
          }
          if (body && body.code !== 0) {
            this.messageService.error(`(${body.code})${body.message}`);
            return throwError(body);
          } else {
            // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
            return of(ev);
          }
        }
        break;
      case 401:
        this.tokenService.cleanToken();
        this.goTo('/passport/login');
        throw new Error("401");
      case 403:
      case 404:
      case 500:
        /* this.goTo(`/exception/${ev.status}`);*/
        return throwError(ev);
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (DefaultInterceptor.needAppendURL(url)) {
      url = environment.pathPrefix + url;
    }
    let headers = req.headers;
    if (this.tokenService.getToken()) {
      const token = this.tokenService.getToken() as string;
      headers = headers.append(this.tokenService.header_token_name, token);
    }
    //next.handle()
   // next.handle().subscribe()
    const newReq = req.clone({url,headers});
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) return this.handleData(event, next, req);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, next, req)),
    );
  }

  private static needAppendURL(url: string) {
    return !url.startsWith('https://') && !url.startsWith('http://') && !/^(\/|)assets\//.test(url);
  }




}
