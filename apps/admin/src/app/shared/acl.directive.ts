import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {MeService} from "@core/services/me.service";
import {filter} from "rxjs";

@Directive({
  selector: '[acl]'
})
export class AclDirective {
  private hasView = false;

  constructor(private meService: MeService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }


  @Input() set acl(params: { resource: string, method?: string } | string) {
    let full: string;
    if (typeof params === 'string') {
      full = params;
    } else {
      const {resource, method} = params;
      full = `${method || 'post'} ${resource}`;
    }
    const condition = this.meService.hasRole("ADMIN") || this.meService.hasResource(full);
    if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    } else if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }


}
