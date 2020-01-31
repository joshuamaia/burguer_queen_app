import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productsOrder',
  templateUrl: './productsOrder.component.html',
  styleUrls: ['./productsOrder.component.css']
})
export class ProductsOrderComponent implements OnInit {

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
  }

}
