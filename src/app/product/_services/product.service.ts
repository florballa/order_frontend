import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Product, ProductCategory} from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl = `http://127.0.0.1:8000/products/`;
  productCategoriesUrl = `http://127.0.0.1:8000/product-categories/`;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.productCategoriesUrl)
      .pipe(
        catchError(this.handleError<ProductCategory[]>('getCategories', []))
      );
  }

  getSingleProduct(id) {
    return this.http.get(this.productsUrl + id + '/');
  }

  getSingleCategory(id) {
    return this.http.get(this.productCategoriesUrl + id + '/');
  }

  postProduct(data): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, data)
      .pipe(
        catchError(this.handleError<Product>('addProduct', null))
      );
  }

  postCategory(data): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(this.productCategoriesUrl, data)
      .pipe(
        catchError(this.handleError<ProductCategory>('addCategory', null))
      );
  }

  putProduct(id, data): Observable<Product> {
    return this.http.put<Product>(this.productsUrl + id + '/', data)
      .pipe(
        catchError(this.handleError<Product>('putProduct', null))
      );
  }

  putCategory(id, data): Observable<ProductCategory> {
    return this.http.put<ProductCategory>(this.productCategoriesUrl + id + '/', data)
      .pipe(
        catchError(this.handleError<ProductCategory>('putCategory', null))
      );
  }

  deleteProduct(id): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + id + '/')
      .pipe(
        catchError(this.handleError<Product>('deleteProduct', null))
      );
  }

  deleteCategory(id): Observable<ProductCategory> {
    return this.http.delete<ProductCategory>(this.productCategoriesUrl + id + '/')
      .pipe(
        catchError(this.handleError<ProductCategory>('deleteCategory', null))
      );
  }

  handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
