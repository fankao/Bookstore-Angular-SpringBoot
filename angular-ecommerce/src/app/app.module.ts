import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

//create route
const routes: Routes = [
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
    // tslint:disable-next-line:max-line-length
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductCategoryMenuComponent,
        SearchComponent,
        ProductDetailComponent,
        CartStatusComponent,
    ],
    imports: [
        //configure routes base on routes
        RouterModule.forRoot(routes),

        BrowserModule,
        //Service
        HttpClientModule,
        NgbModule,
    ],
    providers: [ProductService],
    bootstrap: [AppComponent],
})
export class AppModule {}
