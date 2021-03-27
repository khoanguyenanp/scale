import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products;
  errors;
  page = 1;
  limit = 25;
  sort = 'id';
  sort_asc = true;
  query;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  productAction(id) {
    this.router.navigate(['products/' + id]);
  }

  buildQuery() {
    const quey_array = [];
    if (this.limit) {
      quey_array.push('limit=' + this.limit);
    }

    if (this.page) {
      const page = this.page - 1;
      quey_array.push('page=' + page);
    }

    if (this.sort) {
      quey_array.push('sort=' + this.sort);
    }
    this.query = quey_array.join('&');
  }

  getProduct() {
    this.buildQuery();
    this.productsService.getProducts(this.query).subscribe((res: any) => {
      this.products = res.data;
    }, err => {
      this.errors = err.error.message;
    });
  }

  pagination(dir?) {
    if (dir === 'next') {
      this.page++;
    } else {
      this.page--;
    }

    if (this.page === 0) {
      this.page = 1;
    }
    this.getProduct();
  }

  sortBy(name) {
    this.sort = name;
    this.sort_asc = !this.sort_asc;
    if (!this.sort_asc) {
      this.sort = '-' + name;
    }
    this.getProduct();
  }

}
