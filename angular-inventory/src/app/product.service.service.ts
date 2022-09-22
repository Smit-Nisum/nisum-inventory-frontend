import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  baseURL = 'http://localhost:8081/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${this.baseURL}`);
  }
  deletById(id: String) {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }
}
