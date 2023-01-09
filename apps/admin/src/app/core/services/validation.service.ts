import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormlyFieldConfig} from "@ngx-formly/core/lib/models/fieldconfig";
import {Observable, tap} from "rxjs";
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private translateService: TranslateService) {
  }


  username() {
    return {
      expression: (c: AbstractControl, field: FormlyFieldConfig) => !c.value || /^(?![0-9]+$)[0-9a-z]{4,8}$/.test(c.value),
      message: (error: any, field: FormlyFieldConfig) => this.translateService.get("common.validation.username"),
    };
  }
  password() {
    return {
      expression: (c: AbstractControl, field: FormlyFieldConfig) => !c.value || /^(?![0-9]+$).{6,16}$/.test(c.value),
      message: (error: any, field: FormlyFieldConfig) => this.translateService.get("common.validation.password"),
    };
  }
  phone() {
    return {
      expression: (c: AbstractControl, field: FormlyFieldConfig) => !c.value || /^1\d{10}$/.test(c.value),
      message: (error: any, field: FormlyFieldConfig) => this.translateService.get("common.validation.phone"),
    };
  }
  email() {
    return {
      expression: (c: AbstractControl, field: FormlyFieldConfig) => !c.value || /^[^@]*@[^.@]+\.[^.@]+$/.test(c.value),
      message: (error: any, field: FormlyFieldConfig) => this.translateService.get("common.validation.email"),
    };
  }

  requiredMessage = (error: any, field: FormlyFieldConfig): (Observable<string>) => {
    return this.translateService.get("common.validation.required");
  }

  minLengthMessage = (error: any, field: FormlyFieldConfig): (Observable<string>) => {
    return this.translateService.get("common.validation.minLength", {value: field!.templateOptions!.minLength});
  }

  maxLengthMessage = (error: any, field: FormlyFieldConfig): (Observable<string>) => {
    return this.translateService.get("common.validation.maxLength", {value: field!.templateOptions!.maxLength});
  }

  minMessage = (error: any, field: FormlyFieldConfig): (Observable<string>) => {
    return this.translateService.get("common.validation.min", {value: field!.templateOptions!.min});
  }


  maxMessage = (error: any, field: FormlyFieldConfig): (Observable<string>) => {
    return this.translateService.get("common.validation.max", {value: field!.templateOptions!.max});
  }
}
