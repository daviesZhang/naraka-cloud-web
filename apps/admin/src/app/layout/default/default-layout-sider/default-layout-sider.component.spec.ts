import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutSiderComponent } from './default-layout-sider.component';

describe('DefaultLayoutSiderComponent', () => {
  let component: DefaultLayoutSiderComponent;
  let fixture: ComponentFixture<DefaultLayoutSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultLayoutSiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
