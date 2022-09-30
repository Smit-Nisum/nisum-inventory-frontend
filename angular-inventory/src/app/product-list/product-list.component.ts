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

import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

interface Product {
  upc: string;
  prodName: string;
  category: String;
  pricePerUnit: number;
  availableStock: number;
  reservedStock: number;
  shippedStock: number;
}

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditProductBtnComponent } from '../edit-product-btn/edit-product-btn.component';
import { ProductNotFoundComponent } from '../product-not-found/product-not-found.component';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  upcValue: string = 'hello';

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
  category = '';

  textSub: Subscription;
  cateSub: Subscription;

  dialogRef: any;

  constructor(
    private ps: ProductService,
    private searchService: SearchService,
    private matDialog: MatDialog,
    private readonly _authService: SocialAuthService,
    private router: Router
  ) {}

  //grab data from the source
  ngOnInit(): void {
    this.textSub = this.searchService.filterText$.subscribe((text) => {
      this.filterText = text;
      this.applyFilter(text);
    });

    this.ps.getProducts().subscribe((products) => {
      this.initProducts(products);
    });

    this.cateSub = this.searchService.category$.subscribe((search: any) => {
      this.category = search;

      this.applyFilter(this.filterText);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.productSort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.textSub.unsubscribe();
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

  public sortData(sort: Sort) {
    const sortedData = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = sortedData.sort((a, b) => {
        return compare(a.upc, b.upc, true);
      });
      return;
    }

    this.dataSource.data = sortedData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'upc':
          return compare(a.upc, b.upc, isAsc);
        case 'prodName':
          return compare(
            a.prodName.toLowerCase(),
            b.prodName.toLowerCase(),
            isAsc
          );
        case 'category':
          return compare(
            a.category.toLowerCase(),
            b.category.toLowerCase(),
            isAsc
          );
        case 'pricePerUnit':
          return compare(a.pricePerUnit, b.pricePerUnit, isAsc);
        case 'availableStock':
          return compare(a.availableStock, b.availableStock, isAsc);
        case 'reservedStock':
          return compare(a.reservedStock, b.reservedStock, isAsc);
        case 'shippedStock':
          return compare(a.shippedStock, b.shippedStock, isAsc);
        default:
          return 0;
      }
    });
  }

  /*
    Will return the dom reference of the current row selected
    will get called on button click by default
  */
  selectedRow(row: any): void {
    console.log('selectedRow', row);
    this.matDialog.open(ProductDetailModalComponent, {
      width: '35%',
      height: 'calc(60%)',
      data: { ...row },
    });
    // this.dialog
  }

  applyFilter(text: string) {
    this.filterText = text;
    this.filterText = this.filterText.trim(); // Remove whitespace
    this.filterText = this.filterText.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.filterText;
    this.filterByDropDown(this.category);
  }

  filterByDropDown(search: any) {
    this.dataSource.data = this.products.filter((p) => {
      const field = p[search as keyof Product];

      if (this.category === 'all') {
        let foundItem = false;
        Object.entries(p).forEach((f) => {
          console.log(f);
          if (
            f.toString().toLowerCase().includes(this.filterText.toLowerCase())
          ) {
            foundItem = true;
          }
        });
        return foundItem;
      } else if (typeof field === 'string') {
        return field.toLowerCase().includes(this.filterText.toLowerCase());
      } else if (typeof field === 'number') {
        return field.toString().includes(this.filterText);
      }
      return true;
    });
  }

  /*
    Will show the pop up dialog before delete product
  */
  openDialog(row: any) {
    this.ps.getProductById(row.upc).subscribe(
      (product) => {
        this.matDialog.open(DeleteDialogComponent, {
          height: '200',
          width: '250px',
        });
        this.ps.setUpc(row.upc);
      },
      (err) => {
        this.matDialog.open(ProductNotFoundComponent, {
          height: '200px',
          width: '410px',
        });
      }
    );

    console.log(row.upc);
  }

  /*
    will show the pop up window to update
  */
  editPopUp(row: any) {
    console.log('Open pop up');
    console.log('To delete Product Check : ' + row.upc);
    this.ps.getProductById(row.upc).subscribe(
      (product) => {
        console.log('print this' + product.prodName);
        this.matDialog.open(EditProductBtnComponent, {
          height: '640px',
          width: '500px',
        });
        this.ps.setUpc(row.upc);
      },
      (err) => {
        this.matDialog.open(ProductNotFoundComponent, {
          height: '200px',
          width: '410px',
        });
        // console.log('no product found');
        // alert('no product found');
        // window.location.reload();
      }
    );
    console.log(row.upc);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
