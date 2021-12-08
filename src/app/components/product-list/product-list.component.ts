import { Component, OnInit } from '@angular/core';
import { ProductService, IProduct } from './../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  selectedProduct!: IProduct;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    // Change to Promisse or Observer ?
    this.products = this.productService.getProducts();
  }

  share(product: IProduct): void {
    console.log(product);

    window.alert('The product has been shared!');
  }

  onNotify(): void {
    window.alert('You will be notified when the product goes on sale');
  }
}
