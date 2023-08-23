import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../_services/order.service';
import {Router} from '@angular/router';
import {Order} from '../../order';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'code', 'code_year', 'date_registered', 'costumer_id', 'update', 'delete'];
  dataSource: MatTableDataSource<Order>;

  constructor(private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getOrdersFromServer();
  }

  getOrdersFromServer() {
    this.orderService.getOrders().subscribe(response => {
      this.orders = response;
      this.dataSource = new MatTableDataSource<Order>(response);
    });
  }

  navigateToOrderForm(orderId?) {
    if (orderId) {
      this.router.navigateByUrl(`orders/form/${orderId}`);
    } else {
      this.router.navigateByUrl(`orders/form`);
    }
  }

  deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId).subscribe(response => {
      console.log(response);
      this.getOrdersFromServer();
    }, error => {
      console.log(error);
    });
  }

}
