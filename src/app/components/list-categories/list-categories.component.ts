import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  // Atributos
  public listCategories: any[];

  constructor(
    private productService: ProductService
  ) {
    this.listCategories = [];
  }

  ngOnInit() {
    // Muestros las categorias principales
    this.listCategories = this.productService.categories;
  }

  /**
   * Guarda los productos a mostrar desde la categoria origen
   * @param category categoria origen
   */
  selectCategory(category) {
    this.productService.productsSelected = category.products;
  }

}
