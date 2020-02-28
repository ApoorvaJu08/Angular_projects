import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: `
  <img class="product-image" [src]="product.imageUrl">
  `,
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
