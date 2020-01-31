import { Product } from 'src/app/models/product';
import { IOrder } from './../interfaces/iorder';
import * as _ from 'lodash';

export class Order implements IOrder {

    constructor(data) {
        _.set(this, 'data', data);
        this.productsOrder = [];
    }

    get productsOrder(): Product[] {
        return _.get(this, 'data.productsOrder');
    }

    set productsOrder(value: Product[]) {
        _.set(this, 'data.productsOrder', value);
    }

    /**
     * Añade un producto al pedido.
     * En caso de que exista, se incrementa la cantidad, sino lo añade con cantidad 1
     * @param product 
     */
    addProduct(product: Product) {

        // Busco el producto
        // IMPORTANTE: el producto que viene no tiene una propiedad llamada quantity,
        // esta la creamos al meterlo en el pedido
        const productFound = _.find(this.productsOrder, p => {
            // Creo una copia del producto
            let copy = _.cloneDeep(p);
            // Quito la cantidad
            _.unset(copy, 'data.quantity');
            return _.isEqual(p, product);
        })

        if (productFound) {
            // Si existe el producto, incremento la cantidad
            product.quantity++;
        } else {
            // Sino existe el producto, le creo la propiedad quantity y lo meto en el array
            product.quantity = 1;
            this.productsOrder.push(product);
        }

    }

    /**
     * Añade en uno mas la cantidad del producto pasado
     * @param product producto a incrementar
     */
    oneMoreProduct(product: Product){
        product.quantity++;
    }

    /**
     * Quito en uno la cantidad del producto pasado
     * @param product producto a restar
     */
    oneLessProduct(product: Product){
        product.quantity--;
        // Si la cantidad es cero, se borra de los productos
        if(product.quantity === 0){
            // IMPORTANTE: en este caso no es necesario modificar ningun producto,
            // ya que en este caso estaran con las mismas propiedades
            _.remove(this.productsOrder, p => _.isEqual(p, product))
        }
    }

    /**
     * Devuelve el numero de productos en el pedido
     */
    numProducts(){
        return this.productsOrder.length;
    }

    /**
     * Devuelve el precio total de un pedido
     */
    totalOrder(){

        let total = 0;

        // Recorro los productos y sumo los productos
        _.forEach(this.productsOrder, p => {
            total += p.totalPrice() * p.quantity;
        });

        return total;
    }

}
