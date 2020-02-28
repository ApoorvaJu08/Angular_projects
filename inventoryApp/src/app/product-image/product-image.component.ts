import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
@Component({
  selector: 'app-product-image',
  template: `
  <!-- <img class="product-image" src="{{ product.imageUrl }}"> -->
  `,
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
