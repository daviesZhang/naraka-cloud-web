import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, retryWhen, Subscription, switchMap, tap, timer} from "rxjs";
import {rxRetryWhen} from '@shared/utils/tools';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token_key = 'token';

  header_token_name = 'Authorization';

  timerSubscribe?: Subscription;

  constructor(private http: HttpClient) {
  }


  refreshToken(due = 0) {
    if (this.timerSubscribe) {
      this.timerSubscribe.unsubscribe();
    }
    this.timerSubscribe = timer(due, 1000 * 60 * 20)
      .pipe(switchMap(() => this.http.get<HttpResponse<any>>("/system/token/refresh").pipe(retryWhen(rxRetryWhen(3, 1000 * 30)))))
      .subscribe(() => {
        console.log('refreshToken success...');
      });
  }


  requestToken(data: { [key: string]: any }): Observable<string | null> {
    return this.http.post<HttpResponse<any>>("/system/token", data, {observe: 'response'})
      .pipe(map(response => response.headers.get(this.header_token_name)),
        tap(() => {
          this.refreshToken(1000 * 60 * 20);
        }));
  }

  saveToken(token: string): void {
    localStorage.setItem(this.token_key, token);
  }

  cleanToken() {
    localStorage.removeItem(this.token_key);
  }


  getToken(): string | null {
    return localStorage.getItem(this.token_key);
  }

}
