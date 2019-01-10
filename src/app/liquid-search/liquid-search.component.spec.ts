import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidSearchComponent } from './liquid-search.component';

describe('LiquidSearchComponent', () => {
  let component: LiquidSearchComponent;
  let fixture: ComponentFixture<LiquidSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
