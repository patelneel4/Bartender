import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksCarouselComponent } from './drinks-carousel.component';

describe('DrinksCarouselComponent', () => {
  let component: DrinksCarouselComponent;
  let fixture: ComponentFixture<DrinksCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
