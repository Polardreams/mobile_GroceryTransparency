import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritsCreateComponent } from './favorits-create.component';

describe('FavoritsCreateComponent', () => {
  let component: FavoritsCreateComponent;
  let fixture: ComponentFixture<FavoritsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
