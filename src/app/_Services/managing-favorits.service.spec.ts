import { TestBed } from '@angular/core/testing';

import { ManagingFavoritsService } from './managing-favorits.service';

describe('ManagingFavoritsService', () => {
  let service: ManagingFavoritsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingFavoritsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
