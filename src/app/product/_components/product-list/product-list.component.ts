import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {Router} from '@angular/router';
import {Product} from '../../product';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'default_price', 'description', 'categories', 'update', 'delete'];
  dataSource: MatTableDataSource<Product>;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.getProductsFromServer();
  }

  getProductsFromServer() {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
      this.dataSource = new MatTableDataSource<Product>(response);
    });
  }

  navigateToProductForm(productId?) {
    if (productId) {
      this.router.navigateByUrl(`products/form/${productId}`);
    } else {
      this.router.navigateByUrl(`products/form`);
    }
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe(response => {
      console.log(response);
      this.getProductsFromServer();
    }, error => {
      console.log(error);
    });
  }

}
