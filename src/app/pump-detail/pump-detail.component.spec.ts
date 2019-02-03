import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpDetailComponent } from './pump-detail.component';

describe('PumpDetailComponent', () => {
  let component: PumpDetailComponent;
  let fixture: ComponentFixture<PumpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
