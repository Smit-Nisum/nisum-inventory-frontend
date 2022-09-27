import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-not-found',
  templateUrl: './product-not-found.component.html',
  styleUrls: ['./product-not-found.component.css'],
})
export class ProductNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clickOK() {
    window.location.reload();
  }
}
