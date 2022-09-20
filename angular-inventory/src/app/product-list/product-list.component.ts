import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((products) => {
      console.table(products);
      this.products = products;
    });
  }
}
