import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuCardforshoppinglistComponent } from './submenu-cardforshoppinglist.component';

describe('SubmenuCardforshoppinglistComponent', () => {
  let component: SubmenuCardforshoppinglistComponent;
  let fixture: ComponentFixture<SubmenuCardforshoppinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuCardforshoppinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuCardforshoppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
