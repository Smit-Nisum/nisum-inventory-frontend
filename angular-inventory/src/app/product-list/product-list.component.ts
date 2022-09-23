import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;

  constructor(
    private _productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._productService.getAllProd().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }
}
