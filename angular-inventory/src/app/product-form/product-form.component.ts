import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm?: FormGroup | any;
  isSubmitted? = false;
  products: any;
  upc: string;
  btnLabel = 'Submit';
  popup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private actRouter: ActivatedRoute
  ) {
    this.upc = this.actRouter.snapshot.params['upc'];
    console.log('this.upc ' + this.upc);
  }

  updated() {
    if (this.upc) {
      console.log(typeof this.upc);

      this.productService
        .updateById(this.upc, this.productForm.value)
        .subscribe((product) => {
          this.products = product;
          console.log(this.products);
          console.log(product);
          this.router.navigate(['/product-list']);
          return false;
        });
    }

    if (!this.upc) {
      this.isSubmitted = true;
      if (this.productForm.valid) {
        this.productService
          .createProduct(this.productForm.value)
          .subscribe((product: any) => {
            this.isSubmitted = false;
            this.router.navigate(['/product-list']);
          });
      }
    }
  }

  ngOnInit(): void {
    if (!this.upc) {
      console.log('..........1');
    } else {
      this.productService.getProductById(this.upc).subscribe((product: any) => {
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
        this.btnLabel = 'Update';
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
