import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { SearchService } from 'src/shared/services/search.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  products = [];

  // TableVirtualScrollDataSource will hold the data for the material table
  dataSource = new MatTableDataSource(this.products);

  // Sort object to sort columns of the table by
  @ViewChild('productSort') productSort = new MatSort();
  //used for pagination of products table
  @ViewChild('paginator') paginator!: MatPaginator;

  columns = [
    'upc',
    'prodName',
    'category',
    'pricePerUnit',
    'availableStock',
    'reservedStock',
    'shippedStock',
  ];

  //previous columns are dynamic, append static columns at the end
  displayedColumns = this.columns.concat('View/Edit', 'Delete');

  /* 
    Displayed column names will be different from property value of the actual
     product object
  */
  displayProductTable = {
    upc: 'UPC',
    prodName: 'Product Name',
    category: 'Category',
    pricePerUnit: 'Price Per Unit',
    availableStock: 'Available Stock',
    reservedStock: 'Reserved Stock',
    shippedStock: 'Shipped Stock',
  };

  //used in material table to find the index/row of a table item
  selectedRowIndex: any = null;

  //search bar text will be displayed/updated here
  filterText = '';

  subscription: Subscription;

  constructor(
    private ps: ProductService,
    private searchService: SearchService,
    private readonly _authService: SocialAuthService,
    private router: Router
  ) {}

  //grab data from the source
  ngOnInit(): void {
    this.subscription = this.searchService.filterText$.subscribe((text) => {
      this.applyFilter(text);
    });

    this.ps.getProducts().subscribe((products) => {
      this.initProducts(products);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.productSort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initProducts(products: any) {
    this.products = products;
    this.dataSource = new MatTableDataSource(this.products);

    this.dataSource.sort = this.productSort;
    this.dataSource.paginator = this.paginator;
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

  signOut(): void {
    this._authService.signOut();
    localStorage.removeItem('APP_TOKEN');
    this.router.navigate(['/login-page']);
  }
}
