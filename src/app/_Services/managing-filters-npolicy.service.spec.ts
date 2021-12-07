import { TestBed } from '@angular/core/testing';

import { ManagingFiltersNPolicyService } from './managing-filters-npolicy.service';

describe('ManagingFiltersNPolicyService', () => {
  let service: ManagingFiltersNPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingFiltersNPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
