import { TestBed } from '@angular/core/testing';

import { NflplayersService } from './nflplayers.service';

describe('NflplayersService', () => {
  let service: NflplayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NflplayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
