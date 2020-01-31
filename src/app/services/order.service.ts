import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Pedido actual
  private _order: Order;
  // Numero de pedido actual
  private _numOrder: number;

  constructor(private http: HttpClient) {
    this._order = new Order({});
    this._numOrder = 1;
  }

  /**
   * Devuelve el numero de pedido actual
   */
  get numOrder(): number {
    return this._numOrder;
  }

  /**
   * Setea el numero de pedido actual
   */
  set numOrder(value: number) {
    this._numOrder = value;
  }

  /**
   * Devuelve el pedido actual
   */
  get order(): Order {
    return this._order;
  }

  /**
   * Setea el pedido
   */
  set order(value: Order) {
    this._order = value;
  }

  /**
   * Guarda el pedido en FireBase
   */
  createOrder(): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    // IMPORTANTE: por temas de seguridad, se deshabilitara las rutas de firebase, crea tu propio proyecto firebase para poder probarlo.
    const url = "https://burguer-queen-app.firebaseio.com/orders.json";

    // Crea el body para el POST
    const body = JSON.stringify(this.convertOrder());

    return this.http.post(url, body, { headers: headers })

  }

  /**
   * Convierte el pedido actual a un formato especifico:
   *  - products: productos del pedido
   *  - date: fecha del pedido
   *  - numOrder: numero de pedido
   *  - priceOrder: precio del pedido
   */
  convertOrder() {

    const finalOrder = {
      "products": [],
      "date": new Date(),
      "numOrder": this._numOrder,
      "priceOrder": this.order.totalOrder()
    }

    _.forEach(this.order.productsOrder, product => {

      // Creo una estructura del producto
      //  - name: nombre del producto
      //  - priceFinal: precio final del producto (precio * cantidad)
      //  - extras: los extras del producto (menu grande, patatas, etc.)
      //  - quantity: cantidad del producto pedido
      const finalProduct = {
        "name": product.name,
        "priceFinal": product.totalPrice() * product.quantity,
        "extras": product.getExtras(),
        "quantity": product.quantity
      }

      // añado el producto a nuestros productos.
      finalOrder.products.push(finalProduct);

    });

    // Incremento el numero de pedido
    this._numOrder++;

    return finalOrder;

  }

  /**
   * Limpia la orden, creando una nueva orden
   */
  clearOrder() {
    this.order = new Order({});
  }

}
