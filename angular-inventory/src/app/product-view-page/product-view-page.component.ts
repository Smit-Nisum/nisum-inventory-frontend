import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductBtnComponent } from '../create-product-btn/create-product-btn.component';

@Component({
  selector: 'app-product-view-page',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.css'],
})
export class ProductViewPageComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private dialogRef: MatDialog) {}

  openDialog() {
    console.log('open dialog fn');
    this.dialogRef.open(CreateProductBtnComponent, {
      height: '650px',
      width: '500px',
    });
  }
}
