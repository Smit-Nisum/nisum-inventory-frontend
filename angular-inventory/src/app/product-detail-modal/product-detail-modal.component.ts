import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ProductDetailModalComponent implements OnInit {
  name: String;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.name;
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
