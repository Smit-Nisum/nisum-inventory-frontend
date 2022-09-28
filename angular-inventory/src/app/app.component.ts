import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductBtnComponent } from './create-product-btn/create-product-btn.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-inventory';
  
  constructor(private dialogRef : MatDialog){}

  openDialog(){
    this.dialogRef.open(CreateProductBtnComponent,{ height: '770px',
    width: '500px'})
  }


}
