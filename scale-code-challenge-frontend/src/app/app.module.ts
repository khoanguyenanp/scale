import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'products', component: ProductsListComponent, pathMatch: 'full' },
  { path: 'products/:id', component: ProductsComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
