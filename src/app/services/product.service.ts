import { Injectable } from '@angular/core';
// Fake data
import { products } from './data/products';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): IProduct[] {
    return products;
  }

  getProduct(id: number): IProduct | undefined {
    return products.find(p => p.id === id);
  }
}
