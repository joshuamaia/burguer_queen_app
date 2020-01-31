import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Datos del fichero json se va modificando
  private _data: any;
  // Datos del fichero json inicial
  private _dataOriginal: any;
  // Productos de una categoria
  private _productsSelected: Product[];
  // Producto a mostrar
  private _productSelected: Product;

  constructor(private http: HttpClient) { }

  /**
   * Devuelve las categorias
   */
  get categories() {
    return _.get(this._data, 'categories');
  }

  /**
   * Devuelve los productos seleccionados
   */
  get productsSelected(): Product[] {
    return this._productsSelected;
  }
  /**
   * Productos de una categoria
   */
  set productsSelected(value: Product[]) {
    this._productsSelected = value;
  }

  /**
   * Devuelvo el producto seleccionado
   */
  get productSelected(): Product {
    return this._productSelected;
  }
  /**
   * Seteo el producto elegido
   */
  set productSelected(value: Product) {
    this._productSelected = value;
  }

  /**
   * Obtengo los datos de products.json
   * Guardo el estado original en un atributo
   */
  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/products.json').subscribe(data => {
        this._data = _.cloneDeep(data);
        this._dataOriginal = _.cloneDeep(data);
        resolve(true);
      }, error => {
        console.error('Error al recuperar los productos: ' + error);
        reject(true);
      })
    })
  }

  /**
   * Resetea los datos al fichero json original.
   */
  resetProducts(){
    this._data = _.cloneDeep(this._dataOriginal);
  }

}
