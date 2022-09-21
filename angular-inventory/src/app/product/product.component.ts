import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

  modalHidden : boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  setModal() : void {
    this.modalHidden = !this.modalHidden;
    console.log(this.modalHidden);
    
  }

}
