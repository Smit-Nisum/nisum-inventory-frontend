import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/shared/services/product.service';



@Component({
  selector: 'app-create-product-btn',
  templateUrl: './create-product-btn.component.html',
  styleUrls: ['./create-product-btn.component.css']
})
export class CreateProductBtnComponent implements OnInit {
  errorMessage: any = "error";

  constructor( private ps:ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

 

  addProductForm = this.formBuilder.group({
    upc :  '',
    prodName  : '',
    brand : '',
    prodDesc  : '',
    category  : '',
    pricePerUnit  : '',
    imageURL  : '',
    availableStock  : '',
    reservedStock : '',
    shippedStock : ''
  });

  product = {};

  onSubmit(): void{
    this.product = this.addProductForm.value;
    console.log(this.product);
    this.productCreation();
    
  }

  productCreation(){
    this.ps.createProduct(this.product).subscribe({
      next: () => this.onSaveComplete(),
      error: err => this.errorMessage = err
    })
  }

  onSaveComplete(): void {
    console.log("product has been sent to backend");
    this.product = {};
    this.addProductForm.reset();
    this.closePopup();

  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
