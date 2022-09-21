import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  // <th scope="col">UPC</th>
  // <th scope="col" >Product Name</th>
  // <th scope="col">Category</th>
  // <th scope="col">Price Per Unit</th>
  // <th scope="col">Available Stock</th>
  // <th scope="col">Reserved Stock</th>
  // <th scope="col">Shipped Stock</th>
  // <th scope="col">View/Edit</th>
  // <th scope="col">Delete</th>
  displayedColumns = [
    'upc',
    'prodName',
    'category',
    'pricePerUnit',
    'availableStock',
    'reservedStock',
    'shippedStock',
    'View/Edit',
    'Delete',
  ];
  /*
    Start and end index representing how many table cells are present 
    in the table  
  */
  start: number = 0;
  limit: number = 15;
  end: number = this.limit + this.start;
  selectedRowIndex: any = null;

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((products) => {
      console.table(products);
      this.products = products;
    });
  }
  onClickSort() {}

  /*
    Table scroll event handler
  */
  onTableScroll(e: any) {
    console.log(e);
    const tableViewHeight = e.target.offsetHeight; // viewport
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      let data = this.getTableData(this.start, this.end);
      this.products = this.products.concat(data);
      this.updateIndex();
    }
  }

  /*
    Filter prodcuts to get products in range
  */
  getTableData(start: any, end: any) {
    return this.products.filter(
      (value: any, index: any) => index >= start && index < end
    );
  }

  /*
    updates the index position of where you are in the table currently
  */
  updateIndex() {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  /*
    Will return the dom reference of the current row selected
    will get called on button click by default
  */
  selectedRow(row: any) {
    console.log('selectedRow', row);
  }
}
