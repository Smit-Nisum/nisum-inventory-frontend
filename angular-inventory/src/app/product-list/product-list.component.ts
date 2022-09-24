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
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

import { MatSort, Sort } from '@angular/material/sort';


interface Product { upc: string, prodName: string, category: String, pricePerUnit: number, availableStock: number, reservedStock: number, shippedStock: number }

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];

  // TableVirtualScrollDataSource will hold the data for the material table
  dataSource = new TableVirtualScrollDataSource(this.products);

  // Sort object to sort columns of the table by
  @ViewChild('productSort') productSort = new MatSort();

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
    private searchService: SearchService
  ) { }

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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initProducts(products: any) {
    this.products = products;

    this.dataSource = new TableVirtualScrollDataSource(this.products);

    // this.dataSource.sort = this.productSort;
  }



  getDisplayColumns() {
    const result = Object.values(this.displayProductTable);
    console.log(result, 'result!');
    return Object.values(result);
  }

  public sortData(sort: Sort) {
    const sortedData = this.products.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = sortedData;
      return;
    }

    this.dataSource.data = sortedData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'upc': return compare(a.upc, b.upc, isAsc);
        case 'prodName': return compare(a.prodName.toLowerCase(), b.prodName.toLowerCase(), isAsc);
        case 'category': return compare(a.category.toLowerCase(), b.category.toLowerCase(), isAsc);
        case 'pricePerUnit': return compare(a.pricePerUnit, b.pricePerUnit, isAsc);
        case 'availableStock': return compare(a.availableStock, b.availableStock, isAsc);
        case 'reservedStock': return compare(a.reservedStock, b.reservedStock, isAsc);
        case 'shippedStock': return compare(a.shippedStock, b.shippedStock, isAsc);
        default: return 0;
      }
    })
  }




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

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
