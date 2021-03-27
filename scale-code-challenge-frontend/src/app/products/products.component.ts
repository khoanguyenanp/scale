import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title;
  errors;
  formdata;
  id;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.formdata = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl()
    });
    if (this.id === 'new') {
      this.initNewProduct();
    } else {
      this.initViewProduct();
    }
  }

  initNewProduct() {
    this.title = 'Add New Product';
    this.formdata = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl()
    });
  }

  initViewProduct() {
    this.title = 'Product Details';
    this.productsService.getProductDetails(this.id).subscribe((res: any) => {
      this.formdata.patchValue(res.data);
    }, err => {
      this.errors = err.error.message;
    });
  }

  submit(data) {
    if (this.id === 'new') {
      this.create(data);
    } else {
      this.update(data);
    }
  }

  create(data) {
    this.productsService.postProduct(data).subscribe(() => {
      this.router.navigate(['']);
    }, err => {
      this.errors = err.error.message;
    });
  }

  update(data) {
    this.productsService.updateProduct(this.id, data).subscribe(() => {
      this.router.navigate(['']);
    }, err => {
      this.errors = err.error.message;
    });
  }

  cancel() {
    this.router.navigate(['']);
  }

  delete() {
    this.productsService.deleteProduct(this.id).subscribe(() => {
      this.router.navigate(['']);
    }, err => {
      this.errors = err.error.message;
    });
  }

}
