import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductBtnComponent } from './edit-product-btn.component';

describe('EditProductBtnComponent', () => {
  let component: EditProductBtnComponent;
  let fixture: ComponentFixture<EditProductBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
