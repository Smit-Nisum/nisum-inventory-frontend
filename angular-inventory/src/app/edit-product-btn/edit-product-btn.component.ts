import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-edit-product-btn',
  templateUrl: './edit-product-btn.component.html',
  styleUrls: ['./edit-product-btn.component.css'],
})
export class EditProductBtnComponent implements OnInit {
  productForm?: FormGroup | any;
  products: any;
  isSubmitted? = false;

  constructor(
    private ps: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  /*
    will update the product
  */
  editProduct() {
    this.isSubmitted = true;

    console.log('Get Value UPC ' + this.ps.upcValue);
    if (this.ps.upcValue && this.productForm.valid) {
      this.ps.updateProduct(this.productForm.value).subscribe((product) => {
        console.log(product);
        // this.router.navigate(['products']);
        window.location.reload();
      });
    }
  }

  get fc() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    if (!this.ps.upcValue) {
      alert('Invalid');
    } else {
      this.ps.getProductById(this.ps.upcValue).subscribe((result: any) => {
        const { product } = result;

        console.log(product);

        console.log('product.upc ' + product.upc);
        console.log(product.prodName);
        this.products = product;

        this.productForm.patchValue({
          upc: product.upc,
          prodName: product.prodName,
          brand: product.brand,
          prodDesc: product.prodDesc,
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
      prodDesc: ['', [Validators.required]],
      category: ['', [Validators.required]],
      pricePerUnit: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9][0-9])?$')],
      ],
      imageURL: ['', [Validators.required]],
      availableStock: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      reservedStock: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      shippedStock: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  get prodName() {
    return this.productForm.get('prodName');
  }

  get brand() {
    return this.productForm.get('brand');
  }

  get prodDescription() {
    return this.productForm.get('prodDescription');
  }

  get category() {
    return this.productForm.get('category');
  }

  get pricePerUnit() {
    return this.productForm.get('pricePerUnit');
  }

  get imageURL() {
    return this.productForm.get('imageURL');
  }

  get availableStock() {
    return this.productForm.get('availableStock');
  }

  get reservedStock() {
    return this.productForm.get('reservedStock');
  }
  get shippedStock() {
    return this.productForm.get('shippedStock');
  }
}
