import {Costumer, User} from '../agent/agent';
import {Product} from '../product/product';

export interface Order {
  id: number;
  code: number;
  code_year: number;
  date_registered: string;
  costumer_id: Costumer;
  user_id: User;
  order_unit: OrderUnit[];
}

export interface OrderUnit {
  oder_id: Order;
  product: Product;
  amount: number;
  price: number;
}
