import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = `http://localhost:8080/api/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/fetchAllItems`);
  }


  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`,product)
    .pipe(
      tap(data => console.log('createProduct: ' + JSON.stringify(data)))
    )
    ;
  }


}
