import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StartupService} from '@core/startup/startup.service';
import {DefaultInterceptor} from '@core/net/default.interceptor';
import {LayoutModule} from "./layout/layout.module";
import {RoutesModule} from './routes/routes.module';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {FormlyConfigModule} from "./formly-config.module";

registerLocaleData(zh);

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  },
  // {
  //   provide: NgxGridTableTranslateService,
  //   useFactory:GridTableServiceFactory,
  //   deps: [],
  // }

];
const INTERCEPTOR_PROVIDES = [
  {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    TranslateModule.forRoot({
      defaultLanguage: 'zh_CN',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    FormlyConfigModule.forRoot(),
    RoutesModule,
    LayoutModule
  ],
  providers: [{
    provide: NZ_I18N,
    useValue: zh_CN
  }, ...INTERCEPTOR_PROVIDES, ...APPINIT_PROVIDES],
  bootstrap: [AppComponent]
})
export class AppModule {
}
