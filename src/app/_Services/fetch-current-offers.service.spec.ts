import { TestBed } from '@angular/core/testing';

import { FetchCurrentOffersService } from './fetch-current-offers.service';

describe('FetchCurrentOffersService', () => {
  let service: FetchCurrentOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCurrentOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
