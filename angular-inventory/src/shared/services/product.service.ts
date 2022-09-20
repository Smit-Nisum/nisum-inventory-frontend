import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = `http://localhost:8080/api/product`;

  constructor() {}
}
