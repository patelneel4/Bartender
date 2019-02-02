import { TestBed } from '@angular/core/testing';

import { PumpsService } from './pumps.service';

describe('PumpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PumpsService = TestBed.get(PumpsService);
    expect(service).toBeTruthy();
  });
});
