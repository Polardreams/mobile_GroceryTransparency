import { TestBed } from '@angular/core/testing';

import { FetchProductdetailsService } from './fetch-productdetails.service';

describe('FetchProductdetailsService', () => {
  let service: FetchProductdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchProductdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
