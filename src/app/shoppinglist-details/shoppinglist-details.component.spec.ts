import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistDetailsComponent } from './shoppinglist-details.component';

describe('ShoppinglistDetailsComponent', () => {
  let component: ShoppinglistDetailsComponent;
  let fixture: ComponentFixture<ShoppinglistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinglistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
