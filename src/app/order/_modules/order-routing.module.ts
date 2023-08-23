import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderListComponent} from '../_components/order-list/order-list.component';
import {OrderFormComponent} from '../_components/order-form/order-form.component';

const routes: Routes = [
  {path: 'list', component: OrderListComponent},
  {path: 'form', component: OrderFormComponent},
  {path: 'form/:id', component: OrderFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule {
}
