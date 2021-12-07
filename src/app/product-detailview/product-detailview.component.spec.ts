import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailviewComponent } from './product-detailview.component';

describe('ProductDetailviewComponent', () => {
  let component: ProductDetailviewComponent;
  let fixture: ComponentFixture<ProductDetailviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
