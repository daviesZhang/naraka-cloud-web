import { Component, OnInit } from '@angular/core';
import {FieldType} from "@ngx-formly/core";

@Component({
  selector: 'lib-formly-field-date',
  templateUrl: './formly-field-date.component.html',
  styleUrls: ['./formly-field-date.component.css']
})
export class FormlyFieldDateComponent extends FieldType {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
