import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuCardforfavoritsComponent } from './submenu-cardforfavorits.component';

describe('SubmenuCardforfavoritsComponent', () => {
  let component: SubmenuCardforfavoritsComponent;
  let fixture: ComponentFixture<SubmenuCardforfavoritsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuCardforfavoritsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuCardforfavoritsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
