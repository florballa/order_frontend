import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductFormComponent} from '../_components/product-form/product-form.component';
import {ProductListComponent} from '../_components/product-list/product-list.component';
import {ProductRoutingModule} from './product-routing.module';
import {ProductCategoryListComponent} from '../_components/product-category-list/product-category-list.component';
import {ProductCategoryFormComponent} from '../_components/product-category-form/product-category-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [ProductFormComponent,
    ProductListComponent,
    ProductCategoryListComponent,
    ProductCategoryFormComponent,
  ],
  exports: [
    ProductFormComponent,
    ProductListComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatSelectModule
    ]
})
export class ProductModule {
}
