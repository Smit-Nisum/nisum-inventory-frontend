import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  pListComp: ProductListComponent;

  constructor(private ps: ProductService) {}

  ngOnInit(): void {}

  /*
   * Delete the product accordint to the upc
   */

  deleteProduct(id: string) {
    console.log('deleteProduct');

    this.ps.deleteProduct(id).subscribe((product) => {
      console.log('deleteProduct', product);

      window.location.reload();
    });
  }

  /*
    Will delete the product when the user click Yes
 
  */
  clickYes() {
    if (this.ps.upcValue) {
      console.log('yes');
      this.deleteProduct(this.ps.upcValue);
    } else {
      alert('yes');
    }
    // console.log(this.pListComp.upcValue);
  }
}
