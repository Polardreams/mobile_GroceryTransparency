import { TestBed } from '@angular/core/testing';

import { FetchSearchResultsService } from './fetch-search-results.service';

describe('FetchSearchResultsService', () => {
  let service: FetchSearchResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchSearchResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
