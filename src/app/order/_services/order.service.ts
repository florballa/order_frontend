import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Order, OrderUnit} from '../order';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersUrl = `http://127.0.0.1:8000/orders/`;

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl)
      .pipe(
        catchError(this.handleError<Order[]>('getOrders', []))
      );
  }

  getSingleOrder(id) {
    return this.http.get(this.ordersUrl + id + '/');
  }

  postOrder(data): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, data)
      .pipe(
        catchError(this.handleError<Order>('addOrder', null))
      );
  }

  putOrder(id, data): Observable<Order> {
    return this.http.put<Order>(this.ordersUrl + id + '/', data)
      .pipe(
        catchError(this.handleError<Order>('putOrder', null))
      );
  }

  deleteOrder(id): Observable<Order> {
    return this.http.delete<Order>(this.ordersUrl + id + '/')
      .pipe(
        catchError(this.handleError<Order>('deleteOrder', null))
      );
  }

  handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
