import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = 'http://localhost:8081/products';
  private upcSource = new Subject<string>();
  upc$ = this.upcSource.asObservable();

  constructor(private http: HttpClient) {}

  getAllProd() {
    return this.http.get<any>(`${this.baseURL}`);
  }

  updateById(upc: string, product: any) {
    this.upcSource.next(upc);
    return this.http.put<any>(`${this.baseURL}/${upc}`, product);
  }
  getProductById(upc: string) {
    this.upcSource.next(upc);
    return this.http.get<any>(`${this.baseURL}/${upc}`);
  }

  createProduct(product: any): any {
    return this.http.post<any>(`${this.baseURL}`, product);
  }
}
