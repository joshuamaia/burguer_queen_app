import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OrderService } from 'src/app/services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // Modal
  @ViewChild("modal_add_product", {static: false}) modalAddProduct;

  // Producto a mostrar
  public product: Product;
  public loadProduct: boolean;
  
  // Extras del producto
  public extras: any;
  // Indice del extra actual
  public extraSelected: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private modalService: NgbModal
  ) {
    this.product = null;
    this.extras = null;
    this.extraSelected = 0;
    this.loadProduct = false;
  }

  ngOnInit() {

    // Sino existe el producto seleccionado, vuelvo al inicio
    if (!this.productService.productSelected) {
      this.router.navigate(['/list-categories'])
    } else {
      // Creo el producto con el producto seleccionado
      this.product = new Product(this.productService.productSelected);

      // Si tiene extras, se los añadimos
      if (this.product.extras) {
        this.extras = this.product.extras[this.extraSelected];
      }
      this.loadProduct = true;
    }

  }

  /**
   * Indica si tiene un extra previo
   */
  hasPrevious() {
    // Compruebo si hay extras
    if (!this.product.extras) {
      return false;
    }
    
    return this.product.extras[this.extraSelected - 1];
  }

  /**
   * Indica si hay un extra siguiente
   */
  hasNext() {
    // Compruebo si tiene extras
    if (!this.product.extras) {
      return false;
    }
    return this.product.extras[this.extraSelected + 1];
  }

  /**
   * Cambia los extras al anterior
   */
  previous() {
    this.extraSelected = this.extraSelected - 1;
    this.extras = this.product.extras[this.extraSelected];
  }

  /**
   * Cambia los extras al siguiente
   */
  next() {
    this.extraSelected = this.extraSelected + 1;
    this.extras = this.product.extras[this.extraSelected];
  }

  /**
   * Añade el producto al pedido
   */
  addProductOrder(){
    
    // añado el producto
    this.orderService.order.addProduct(this.product);
    console.log(this.orderService.order);
    // Reseteamos los productos
    this.productService.resetProducts();
    // Mostramos el modal de confirmación
    this.modalService.open(this.modalAddProduct);
    // Volvemos al inicio
    this.router.navigate(['/list-categories']);

  }


}
