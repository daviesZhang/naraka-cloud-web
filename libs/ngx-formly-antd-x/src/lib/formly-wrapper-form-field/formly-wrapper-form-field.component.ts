import {Component} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
  selector: 'lib-formly-wrapper-form-field',
  templateUrl: './formly-wrapper-form-field.component.html'
})
export class FormlyWrapperFormFieldComponent  extends FieldWrapper  {

  get errorState() {
    return this.showError ? 'error' : '';
  }

  ngOnInit(): void {
  }

}
