import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Order} from '../../order';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../_services/order.service';
import {ProductService} from '../../../product/_services/product.service';
import {AgentService} from '../../../agent/_services/agent.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  isCreate = true;
  chosenOrder: Order[];
  orderFormGroup: FormGroup;
  orderId = null;
  products = [];
  costumers = [];
  price: FormControl;
  order_units: FormArray;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
              private productService: ProductService,
              private agentService: AgentService) {
  }

  ngOnInit(): void {

    this.getCostumers();
    this.getProducts();

    this.orderFormGroup = this.formBuilder.group({
      id: [''],
      code: [''],
      code_year: [''],
      date_registered: [''],
      costumer: [''],
      total: [''],
      order_units: this.formBuilder.array([])
    });

    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.orderId);
    if (this.orderId) {
      this.isCreate = false;
      this.getChosenOrder(this.orderId);
    } else {
      this.addOrderUnit();
    }
  }

  singleOrderUnitFormGroup() {
    return this.formBuilder.group({
      product: [''],
      default_price: [''],
      amount: ['']
    });
  }

  getPrice(childFormGroup) {
    const productId = childFormGroup.controls.product.value;
    const obj = this.products.find(el => el.id === productId);
    childFormGroup.controls.default_price.setValue(obj.default_price);
    this.getTotal();
  }

  getTotal() {
    let Total = 0;
    const orderUnits = this.orderFormGroup.get('order_units') as FormArray;
    for (const unit of orderUnits.controls) {
      Total += unit.value.default_price * unit.value.amount;
    }
    this.orderFormGroup.controls['total'].patchValue(Total);
    return Total;
  }

  addOrderUnit(): void {
    this.order_units = this.orderFormGroup.get('order_units') as FormArray;
    this.order_units.push(this.singleOrderUnitFormGroup());
  }

  updateOrderUnit(unit): void {
    this.order_units = this.orderFormGroup.get('order_units') as FormArray;
    const fg = this.singleOrderUnitFormGroup();
    fg.patchValue(unit);
    this.order_units.push(fg);
  }

  removeOrderUnit(index: number) {
    this.order_units.removeAt(index);
  }

  getCostumers() {
    this.agentService.getCostumers().subscribe(response => {
      this.costumers = response;
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
    });
  }

  getChosenOrder(orderId) {
    this.orderService.getSingleOrder(orderId).subscribe(response => {
      const orderUnits = response['order_units'];
      this.orderFormGroup.patchValue(response);
      console.log(response);
      for (const unit of orderUnits) {
        this.updateOrderUnit(unit);
      }
    });
  }

  saveOrder() {
    if (this.isCreate) {
      return this.orderService.postOrder(this.orderFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('orders/list');
      }, error => {
        console.log(error);
      });
    } else {
      return this.orderService.putOrder(this.orderId, this.orderFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('orders/list');
      }, error => {
        console.log(error);
      });
    }
  }
}
