import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistScreenComponent } from './shoppinglist-screen.component';

describe('ShoppinglistScreenComponent', () => {
  let component: ShoppinglistScreenComponent;
  let fixture: ComponentFixture<ShoppinglistScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinglistScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
