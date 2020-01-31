// Angular
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import { TranslateService } from './services/translate.service';
import { ProductService } from './services/product.service';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsOrderComponent } from './components/productsOrder/productsOrder.component';

export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

export function productFactory(provider: ProductService) {
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    ListCategoriesComponent,
    ListProductsComponent,
    ProductComponent,
    ProductsOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    ProductService,
    {
      provide: APP_INITIALIZER,
      useFactory: productFactory,
      deps: [ProductService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
