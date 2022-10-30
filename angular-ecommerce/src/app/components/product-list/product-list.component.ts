import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  //Post construct
  ngOnInit(): void {
    this.listProduct();
  }
  listProduct() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
