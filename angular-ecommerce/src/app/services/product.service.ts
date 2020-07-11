import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient: HttpClient) {}
  getProductsList(theCategoryId: number): Observable<Product[]> {
    return this.httpClient
      .get<GetRespone>(this.baseUrl)
      .pipe(map((respone) => respone._embedded.products));
  }
}
interface GetRespone {
  _embedded: {
    products: Product[];
  };
}
