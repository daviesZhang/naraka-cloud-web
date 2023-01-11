import {ChangeDetectorRef, Component} from '@angular/core';
import {FieldType} from "@ngx-formly/core";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'lib-formly-field-tree-select',
  templateUrl: './formly-field-tree-select.component.html',
  styleUrls: ['./formly-field-tree-select.component.css']
})
export class FormlyFieldTreeSelectComponent extends FieldType {


  isSync = false;

  isLoading = false;

  optionList: Array<any> = [];

  searchChange$ = new BehaviorSubject('');

  serverSearch = false;

  searchValue = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    const options = this.props.options;
    this.isSync = this.checkOptionsSync(options);

    const defaultValue: Observable<Array<string>> = this.props['defaultValue'];
    if (defaultValue) {
      defaultValue.subscribe(next => {
        this.formControl.setValue(next);
      })
    }

    const serverSearch: undefined | ((params: any) => Observable<any>) = this.props['serverSearch'];
    if (serverSearch) {
      this.serverSearch = true;
    }
    if (!this.checkOptionsSync(options)) {
      this.isLoading = true;
      const optionList$: Observable<string[]> = this.searchChange$
        .asObservable()
        .pipe(distinctUntilChanged(), debounceTime(700))
        .pipe(switchMap((value) => {
          if (options) {
            return options;
          } else if (serverSearch) {
            return serverSearch(value);
          }
          return of([]);
        }));
      optionList$.subscribe(data => {
        this.optionList = data;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  onSearch(value: string): void {
    if (this.isSync) {

    } else if (!this.serverSearch) {

    } else if (this.searchValue !== value) {
      this.searchValue = value;
      this.isLoading = true;
      this.searchChange$.next(value);
    }
  }

  checkOptionsSync(options: any[] | Observable<any[]> | undefined): options is Array<any> {
    return Array.isArray(options);
  }

}
