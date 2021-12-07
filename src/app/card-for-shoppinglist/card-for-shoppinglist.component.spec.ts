import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForShoppinglistComponent } from './card-for-shoppinglist.component';

describe('CardForShoppinglistComponent', () => {
  let component: CardForShoppinglistComponent;
  let fixture: ComponentFixture<CardForShoppinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardForShoppinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardForShoppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
