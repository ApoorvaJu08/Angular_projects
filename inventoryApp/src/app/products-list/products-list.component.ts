import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product.model';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  // @input productList - the Product[] passed to us
  @Input() productList: Product[];
  // @output onProductSelected - outputs the current Product whenever a new Product is selected
  onProductSelected: EventEmitter<Product>;
  // @property currentProduct - local state containing the currently selected `Product`
  private currentProduct: Product;
  constructor() { }

  ngOnInit(): void {
    this.onProductSelected = new EventEmitter();
  }

}
