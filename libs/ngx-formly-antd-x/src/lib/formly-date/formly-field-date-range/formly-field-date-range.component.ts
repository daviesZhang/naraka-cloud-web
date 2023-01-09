import { Component, OnInit } from '@angular/core';
import {FieldType} from "@ngx-formly/core";

@Component({
  selector: 'lib-formly-field-date-range',
  templateUrl: './formly-field-date-range.component.html',
  styleUrls: ['./formly-field-date-range.component.css']
})
export class FormlyFieldDateRangeComponent extends FieldType {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
