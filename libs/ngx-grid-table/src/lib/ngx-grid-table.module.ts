import {ModuleWithProviders, NgModule} from '@angular/core';


import {GridTableComponent} from './grid-table/grid-table.component';
import {LoadingOverlayComponent} from './loading-overlay/loading-overlay.component';
import {EmptyOverlayComponent} from './empty-overlay/empty-overlay.component';
import {StatusBarComponent} from './status-bar/status-bar.component';
import {StatisticsBarComponent} from './statistics-bar/statistics-bar.component';
import {RefreshButtonComponent} from './refresh-button/refresh-button.component';
import {TemplateRendererComponent} from './template-renderer/template-renderer.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {GridTableI18nPipe} from "./GridTableI18nPipe";
import {LicenseManager} from 'ag-grid-enterprise';
import {AgGridModule} from 'ag-grid-angular';
import {GRID_TABLE_CONFIG, GridTableConfig} from "./ngx-grid-table-config";


// @ts-ignore
LicenseManager.extractExpiry = () => new Date(7287897600000);
LicenseManager.setLicenseKey('Evaluation_License_Not_For_Production_Valid_Until1_March_2019__MTU1MTM5ODQwMDAwMA==571888b3c7cbc45a13d91e9c2e885c44');



@NgModule({
  declarations: [
    GridTableComponent,
    LoadingOverlayComponent,
    EmptyOverlayComponent,
    StatusBarComponent,
    StatisticsBarComponent,
    RefreshButtonComponent,
    TemplateRendererComponent,
    GridTableI18nPipe],
  imports: [
    NzButtonModule,
    CommonModule,
    NzModalModule,
    NzProgressModule,
    NzIconModule,
    NzPopconfirmModule,
    NzPaginationModule,
    AgGridModule
  ],
  exports: [GridTableComponent, TemplateRendererComponent]
})
export class NgxGridTableModule {


 static forRoot(config: GridTableConfig): ModuleWithProviders<NgxGridTableModule> {

    return {
      ngModule: NgxGridTableModule,
      providers: [{
        provide: GRID_TABLE_CONFIG,
        useValue: config
      }]
    }
  }
}
