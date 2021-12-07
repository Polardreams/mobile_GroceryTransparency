import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsForFavoritsComponent } from './cards-for-favorits.component';

describe('CardsForFavoritsComponent', () => {
  let component: CardsForFavoritsComponent;
  let fixture: ComponentFixture<CardsForFavoritsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsForFavoritsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsForFavoritsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
