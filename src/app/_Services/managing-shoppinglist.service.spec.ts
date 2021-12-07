import { TestBed } from '@angular/core/testing';

import { ManagingShoppinglistService } from './managing-shoppinglist.service';

describe('ManagingShoppinglistService', () => {
  let service: ManagingShoppinglistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingShoppinglistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
