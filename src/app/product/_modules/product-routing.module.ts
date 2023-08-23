import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from '../_components/product-list/product-list.component';
import {ProductFormComponent} from '../_components/product-form/product-form.component';
import {ProductCategoryListComponent} from '../_components/product-category-list/product-category-list.component';
import {ProductCategoryFormComponent} from '../_components/product-category-form/product-category-form.component';


const routes: Routes = [
  {path: 'list', component: ProductListComponent},
  {path: 'form', component: ProductFormComponent},
  {path: 'form/:id', component: ProductFormComponent},
  {path: 'categories/list', component: ProductCategoryListComponent},
  {path: 'category/form', component: ProductCategoryFormComponent},
  {path: 'category/form/:id', component: ProductCategoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule {
}
