import { TestBed } from '@angular/core/testing';

import { LiquidService } from './liquid.service';

describe('LiquidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiquidService = TestBed.get(LiquidService);
    expect(service).toBeTruthy();
  });
});
