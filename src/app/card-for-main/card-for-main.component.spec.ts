import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForMainComponent } from './card-for-main.component';

describe('CardForMainComponent', () => {
  let component: CardForMainComponent;
  let fixture: ComponentFixture<CardForMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardForMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardForMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
