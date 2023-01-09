import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenService} from "@core/services/token.service";
import {MeService} from "@core/services/me.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'naraka-cloud-web-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {


  validateForm!: FormGroup;

  @Input()
  successCall: () => void = () => {
  };

  constructor(private fb: FormBuilder,
              private tokenService: TokenService,
              private meService: MeService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      principal: [],
      password: [],
    });
  }

  login() {
    this.tokenService.cleanToken();
    this.tokenService.requestToken(this.validateForm.value)
      .pipe(switchMap(() => this.meService.me()))
      .subscribe(response => {
        this.successCall();
      });
  }

}
