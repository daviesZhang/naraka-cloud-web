import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {JsonFormComponent} from "../../json-form/json-form.component";

@Component({
  selector: 'naraka-cloud-web-create-modal',
  templateUrl: './common-modal.component.html',
  styles: [
    `
      .modal-footer {
        display: flex;
        justify-content: flex-end;
      }

      .modal-footer button {
        margin-left: 8px;
      }
    `
  ]
})
export class CommonModalComponent implements OnInit {

  constructor(private modal: NzModalRef) {

  }

  @Input()
  data: any;

  @Input()
  request!: (data: any) => Observable<any>;

  @Input()
  content!: FormlyFieldConfig[] | string | TemplateRef<any>;

  @ViewChild("jsonForm")
  jsonForm?: JsonFormComponent;


  @Input()
  showFooter: boolean = true;


  contentTemplate: TemplateRef<any> | null = null;


  form = new FormGroup({});

  @Output()
  modelChange = new EventEmitter<any>();

  loading = false;

  fields: FormlyFieldConfig[] | null = null;

  contentString = '';

  ngOnInit(): void {
    if (this.isFormly(this.content)) {
      this.fields = this.content;
    } else if (typeof this.content === 'string') {
      this.contentString = this.content;
    } else {
      this.contentTemplate = this.content;
    }

  }

  isFormly(content: FormlyFieldConfig[] | string | TemplateRef<any>): content is FormlyFieldConfig[] {
    return Array.isArray(content);

  }

  submit() {
    let data = null;
    if (this.jsonForm) {
      data = this.jsonForm.submitHandle();
      if (null == data) {
        return;
      }
    }
    this.loading = true;
    this.request(data).pipe(map(next => {
      if (next === undefined || next === null) {
        return true;
      }
      return next;
    })).subscribe({
      next: next => {
        this.modal.close(next);
      }, error: error => {
        this.loading = false;
      }
    });


  }

  cancel() {
    this.modal.close(false);

  }

  destroyModal(): void {
    this.modal.destroy(false);

  }

}
