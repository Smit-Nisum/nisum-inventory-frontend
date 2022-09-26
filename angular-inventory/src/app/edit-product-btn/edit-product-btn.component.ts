import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-edit-product-btn',
  templateUrl: './edit-product-btn.component.html',
  styleUrls: ['./edit-product-btn.component.css'],
})
export class EditProductBtnComponent implements OnInit {
  productForm?: FormGroup | any;
  products: any;

  constructor(private ps: ProductService, private fb: FormBuilder) {}

  /*
    will update the product
  */
  editProduct() {
    console.log('Get Value UPC ' + this.ps.upcValue);
    if (this.ps.upcValue) {
      this.ps.updateProduct(this.productForm.value).subscribe((product) => {
        console.log(product);
        window.location.reload();
      });
    }
  }

  ngOnInit(): void {
    if (!this.ps.upcValue) {
      alert('Invalid');
    } else {
      this.ps.getProductById(this.ps.upcValue).subscribe((product: any) => {
        console.log(product);

        console.log('product.upc ' + product.upc);
        console.log(product.prodName);
        this.products = product;

        this.productForm.patchValue({
          upc: product.upc,
          prodName: product.prodName,
          brand: product.brand,
          prodDescription: product.prodDescription,
          category: product.category,
          pricePerUnit: product.pricePerUnit,
          imageURL: product.imageURL,
          availableStock: product.availableStock,
          reservedStock: product.reservedStock,
          shippedStock: product.shippedStock,
        });
      });
    }

    this.productForm = this.fb.group({
      upc: ['', [Validators.required]],
      prodName: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      prodDescription: ['', [Validators.required]],
      category: ['', [Validators.required]],
      pricePerUnit: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      availableStock: ['', [Validators.required]],
      reservedStock: ['', [Validators.required]],
      shippedStock: ['', [Validators.required]],
    });
  }
}
