import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Costumer, User} from '../agent';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  usersUrl = `http://localhost:8000/users/`;
  costumersUrl = `http://localhost:8000/costumers/`;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getCostumers(): Observable<Costumer[]> {
    return this.http.get<Costumer[]>(this.costumersUrl)
      .pipe(
        catchError(this.handleError<Costumer[]>('getCostumers', []))
      );
  }

  getSingleUser(id) {
    return this.http.get(this.usersUrl + id + '/');
  }

  getSingleCostumer(id) {
    return this.http.get(this.costumersUrl + id + '/');
  }

  postUser(data): Observable<User> {
    return this.http.post<User>(this.usersUrl, data)
      .pipe(
        catchError(this.handleError<User>('addUser', null))
      );
  }

  postCostumer(data): Observable<Costumer> {
    return this.http.post<Costumer>(this.costumersUrl, data)
      .pipe(
        catchError(this.handleError<Costumer>('addCostumer', null))
      );
  }

  putUser(id, data): Observable<User> {
    return this.http.put<User>(this.usersUrl + id + '/', data)
      .pipe(
        catchError(this.handleError<User>('putUser', null))
      );
  }

  putCostumer(id, data): Observable<Costumer> {
    return this.http.put<Costumer>(this.costumersUrl + id + '/', data)
      .pipe(
        catchError(this.handleError<Costumer>('putCostumer', null))
      );
  }

  deleteUser(id): Observable<User> {
    return this.http.delete<User>(this.usersUrl + id + '/')
      .pipe(
        catchError(this.handleError<User>('deleteUser', null))
      );
  }

  deleteCostumer(id): Observable<Costumer> {
    return this.http.delete<Costumer>(this.costumersUrl + id + '/')
      .pipe(
        catchError(this.handleError<Costumer>('deleteCostumer', null))
      );
  }

  handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
