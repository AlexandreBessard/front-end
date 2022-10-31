import { ProductService } from './services/product.service';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '',  redirectTo: '/products', pathMatch: 'full'}, // Empty path
  { path: '**', redirectTo: '/products', pathMatch: 'full' }, // All path
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService], //Inject the given service for our application
  bootstrap: [AppComponent]
})
export class AppModule { }
