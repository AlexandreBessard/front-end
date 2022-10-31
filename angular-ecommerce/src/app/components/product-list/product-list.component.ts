import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
     //ActivatedRoute -> get the 'id' parameter
   }

  //Post construct
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    });
  }

  listProduct() {
    //check id parameter is available
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id'); // id comes from placeholder from path ex: category/1
    if(hasCategory) {
      //convert string to number -> +
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // !  at the end is non-null assertion operator, tell compiler this object is not null
    } else {
      //value set by default
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
