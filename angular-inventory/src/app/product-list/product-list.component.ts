import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { SearchService } from 'src/shared/services/search.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products = [];
  dataSource = new TableVirtualScrollDataSource(this.products);

  @ViewChild('productSort') productSort = new MatSort();

  // columns = [
  //   'UPC',
  //   'Product Name',
  //   'Category',
  //   'Price Per Unit',
  //   'Available Stock',
  //   'Reserved Stock',
  //   'Shipped Stock',
  // ];

  columns = [
    'upc',
    'prodName',
    'category',
    'pricePerUnit',
    'availableStock',
    'reservedStock',
    'shippedStock',
  ];
  displayedColumns = this.columns.concat('View/Edit', 'Delete');

  displayProductTable = {
    upc: 'UPC',
    prodName: 'Product Name',
    category: 'Category',
    pricePerUnit: 'Price Per Unit',
    availableStock: 'Available Stock',
    reservedStock: 'Reserved Stock',
    shippedStock: 'Shipped Stock',
  };

  selectedRowIndex: any = null;

  filterText = '';

  subscription: Subscription;

  constructor(
    private ps: ProductService,
    private searchService: SearchService
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.productSort;
  }

  ngOnInit(): void {
    this.subscription = this.searchService.filterText$.subscribe((text) => {
      this.applyFilter(text);
    });
    this.ps.getProducts().subscribe((products) => {
      this.products = products;

      this.dataSource = new TableVirtualScrollDataSource(this.products);

      this.dataSource.sort = this.productSort;
    });
  }

  getDisplayColumns() {
    const result = Object.values(this.displayProductTable);
    console.log(result, 'result!');
    return Object.values(result);
  }

  onClickSort() {}

  /*
    Will return the dom reference of the current row selected
    will get called on button click by default
  */
  selectedRow(row: any) {
    console.log('selectedRow', row);
  }

  applyFilter(text: string) {
    this.filterText = text;
    this.filterText = this.filterText.trim(); // Remove whitespace
    this.filterText = this.filterText.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.filterText;
  }
}
