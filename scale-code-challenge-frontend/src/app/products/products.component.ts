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
    // Grab id to determine new products vs view existing product
    this.id = this.route.snapshot.params.id;
    // Init form
    this.formdata = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl()
    });
    // Set title and grab data from api if needed
    if (this.id === 'new') {
      this.title = 'Add New Product';
    } else {
      this.initViewProduct();
    }
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
      this.goBackToList();
    }, err => {
      this.errors = err.error.message;
    });
  }

  update(data) {
    this.productsService.updateProduct(this.id, data).subscribe(() => {
      this.goBackToList();
    }, err => {
      this.errors = err.error.message;
    });
  }

  cancel() {
    this.goBackToList();
  }

  delete() {
    this.productsService.deleteProduct(this.id).subscribe(() => {
      this.goBackToList();
    }, err => {
      this.errors = err.error.message;
    });
  }

  goBackToList() {
    this.router.navigate(['']);
  }

}
