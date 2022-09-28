import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = `http://localhost:8080/api/products`;
  upcValue: string;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/fetchAllItems`);
  }

  createProduct(product: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/create`, product)
      .pipe(
        tap((data) => console.log('createProduct: ' + JSON.stringify(data)))
      );
  }

  deleteProduct(upc: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${upc}`);
  }

  getProductById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }

  updateProduct(product: any) {
    console.table(product);
    return this.http.put<any>(`${this.baseUrl}/update`, product);
  }

  setUpc(upc: string) {
    this.upcValue = upc;
  }
}
