import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuCardformainComponent } from './submenu-cardformain.component';

describe('SubmenuCardformainComponent', () => {
  let component: SubmenuCardformainComponent;
  let fixture: ComponentFixture<SubmenuCardformainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuCardformainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuCardformainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
