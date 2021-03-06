import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from './../../services/product.service';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent {

  @Input() product: IProduct | undefined;
  @Output() notify = new EventEmitter();
}
