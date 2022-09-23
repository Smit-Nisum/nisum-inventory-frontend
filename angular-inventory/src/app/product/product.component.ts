import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  upc: any;
  product: any;

  constructor(
    private actRouter: ActivatedRoute,
    private productService: ProductService
  ) {
    this.upc = this.actRouter.snapshot.params['upc'];
  }

  ngOnInit(): void {
    this.actRouter.params.subscribe((params) => {
      this.upc = params['upc'];
      this.productService.getProductById(this.upc).subscribe((product) => {
        this.product = product;
      });
    });
  }
}
