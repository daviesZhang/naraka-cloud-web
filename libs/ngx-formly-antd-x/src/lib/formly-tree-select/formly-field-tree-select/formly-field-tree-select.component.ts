import {ChangeDetectorRef, Component} from '@angular/core';
import {FieldType} from "@ngx-formly/core";
import {Observable} from "rxjs";

@Component({
  selector: 'lib-formly-field-tree-select',
  templateUrl: './formly-field-tree-select.component.html',
  styleUrls: ['./formly-field-tree-select.component.css']
})
export class FormlyFieldTreeSelectComponent extends FieldType {


  isSync = false;











  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    const nodes = this.props['nodes'];
    this.isSync = this.checkOptionsSync(nodes);
    const defaultValue: Observable<Array<string>> = this.props['defaultValue'];
    if (defaultValue) {
      defaultValue.subscribe(next => {
        this.formControl.setValue(next);
      })
    }

  }



  checkOptionsSync(options: any[] | Observable<any[]> | undefined): options is Array<any> {
    return Array.isArray(options);
  }

}
