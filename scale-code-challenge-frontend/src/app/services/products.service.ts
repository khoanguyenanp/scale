import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Product {
  id: Number;
  name: String;
  description: String;
  price: String;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL = 'http://localhost:8000/api';
  header;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders();
  }

  getProducts(query?) {
    let url = this.API_URL + '/products';

    if (query) { url += '?' + query; }

    return this.http.get(url, {headers: this.header});
  }

  postProduct(data: Product) {
    return this.http.post(this.API_URL + '/products', data, {headers: this.header});
  }

  updateProduct(id, data: Product) {
    return this.http.put(this.API_URL + '/products/' + id, data, {headers: this.header});
  }

  getProductDetails(id) {
    return this.http.get(this.API_URL + '/products/' + id, {headers: this.header});
  }

  deleteProduct(id) {
    return this.http.delete(this.API_URL + '/products/' + id, {headers: this.header});
  }
}
