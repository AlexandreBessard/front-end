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
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0; //total elements

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    //ActivatedRoute -> get the 'id' parameter
  }

  //Post construct
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    //If contains keyword, we want to search something
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }


  handleListProducts() {
    //check id parameter is available
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id'); // id comes from placeholder from path ex: category/1
    if (hasCategory) {
      //convert string to number -> +
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // !  at the end is non-null assertion operator, tell compiler this object is not null
    } else {
      //value set by default
      this.currentCategoryId = 1;
    }

    //check if we have a different category than the previous, Angular will reuse a component if it is not being viewed.
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, ` + `this.thePageNumber=${this.thePageNumber}`);
    this.productService.getProductListPaginate(this.thePageNumber - 1, //index 1 for Angular (not 0 as spring REST API)
      this.thePageSize,
      this.currentCategoryId).subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1; //spring data REST: pages are 0 based
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      );
  }
}
