import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductBtnComponent } from './create-product-btn.component';

describe('CreateProductBtnComponent', () => {
  let component: CreateProductBtnComponent;
  let fixture: ComponentFixture<CreateProductBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
