import { Component, OnInit } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import {IAfterGuiAttachedParams, IStatusPanelParams} from "ag-grid-community";


@Component({
  selector: 'lib-status-bar',
  templateUrl: './status-bar.component.html',
  styles: [
  ]
})
export class StatusBarComponent implements OnInit,IStatusPanelAngularComp {

  private params!: IStatusPanelParams;

  constructor() {
  }

  ngOnInit() {
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  agInit(params: IStatusPanelParams): void {
  }
}
