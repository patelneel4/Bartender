import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PourDetailComponent } from './pour-detail.component';

describe('PourDetailComponent', () => {
  let component: PourDetailComponent;
  let fixture: ComponentFixture<PourDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PourDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PourDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
