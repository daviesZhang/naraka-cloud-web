import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormGroup, NgControl} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'naraka-cloud-web-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class JsonFormComponent implements OnInit {

  form = new FormGroup({});

  @Input()
  fields!: FormlyFieldConfig[];

  @Input()
  defaultModel: any;

  @Input()
  formLayout:'horizontal' | 'vertical' | 'inline'= 'inline';

  @Input()
  layoutClass: 'search-grid' | 'create-modal' = 'search-grid';

  @Output()
  modelChange= new EventEmitter<any>();

  @Output()
  submit = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit(): void {
  }

  onModelChange(event:any){
    this.modelChange.emit(event);
  }

  submitHandle():any {
    if (this.form.valid) {
      this.submit.emit(this.form);
      return this.form.value;
    } else {
      Object.values(<Array<AbstractControl>>this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    return null;
  }


  get value():any{
    return this.form.value;
  }

}
