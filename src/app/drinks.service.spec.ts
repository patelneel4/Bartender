import { TestBed } from '@angular/core/testing';

import { DrinkService } from './drinks.service';

describe('DrinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrinkService = TestBed.get(DrinkService);
    expect(service).toBeTruthy();
  });
});
