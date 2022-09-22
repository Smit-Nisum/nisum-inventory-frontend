import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product.service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  popup: boolean = false;

  constructor(
    private ps: ProductServiceService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((products: any[]) => {
      console.table(products);
      this.products = products;
    });
  }
  deleteProduct(id: String) {
    console.log(id);

    this.ps.deletById(id).subscribe((product) => {
      console.log(product);

      window.location.reload();
    });
    this.router.navigate(['/products-list']);
  }
}
