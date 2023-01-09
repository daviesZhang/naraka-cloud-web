import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'naraka-cloud-web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {





  constructor(private router:Router) { }

  ngOnInit(): void {

  }
  successCall= ()=> {

    this.router.navigateByUrl("/").then();
  };


}
