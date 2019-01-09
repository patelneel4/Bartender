import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidsComponent } from './liquids.component';

describe('LiquidsComponent', () => {
  let component: LiquidsComponent;
  let fixture: ComponentFixture<LiquidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
