import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  //inject ProductService object
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    //check if search route contain keyword value
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const keyWordValue: string = this.route.snapshot.paramMap.get('keyword');

    //search for products using keyword
    this.productService.searchProducts(keyWordValue)
     .subscribe(data => this.products = data);
   
  }

  handleListProducts() {
    //check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //convert string to number by '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      //not category available. default to 1
      this.currentCategoryId = 1;
    }

    //get product for given category id
    this.productService
      .getProductsList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
