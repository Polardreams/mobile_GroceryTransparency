import { TestBed } from '@angular/core/testing';

import { FetchAllListsService } from './fetch-all-lists.service';

describe('FetchAllListsService', () => {
  let service: FetchAllListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAllListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
