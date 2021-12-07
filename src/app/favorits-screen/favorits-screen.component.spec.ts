import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritsScreenComponent } from './favorits-screen.component';

describe('FavoritsScreenComponent', () => {
  let component: FavoritsScreenComponent;
  let fixture: ComponentFixture<FavoritsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
