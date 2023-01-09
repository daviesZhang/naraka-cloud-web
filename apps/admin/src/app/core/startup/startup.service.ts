import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, switchMap} from 'rxjs';
import {MeService} from "@core/services/me.service";
import {TranslateService} from "@ngx-translate/core";
import {TokenService} from "@core/services/token.service";


/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    private httpClient: HttpClient,
    private translateService:TranslateService,
    private meService: MeService,
    private tokenService:TokenService,
    private injector: Injector
  ) {

  }


  load(): Promise<any> {

    return new Promise<void>(resolve => {
      this.meService.me().subscribe({
        next:next=>{
          this.tokenService.refreshToken();
        },
        error: err => {
          console.error(err);

          resolve();
        },
        complete: () => resolve()
      });
    });
  }
}
