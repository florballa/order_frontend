import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderFormComponent} from '../_components/order-form/order-form.component';
import {OrderListComponent} from '../_components/order-list/order-list.component';
import {OrderRoutingModule} from './order-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [OrderFormComponent, OrderListComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class OrderModule { }
