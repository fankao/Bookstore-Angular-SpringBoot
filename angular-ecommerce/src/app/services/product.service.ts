import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) {}
  /**
   * Search product for category id
   * @param theCategoryId
   */
  getProductsList(theCategoryId: number): Observable<Product[]> {
    //need build URL base on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient
      .get<GetResponeProducts>(searchUrl)
      .pipe(map((respone) => respone._embedded.products));
  }

  /**
   * Get all product category
   */
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponeProductCategories>(this.categoryUrl)
      .pipe(map((respone) => respone._embedded.productCategory));
  }
}
interface GetResponeProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponeProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
