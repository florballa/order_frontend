import {Component, OnInit} from '@angular/core';
import {Product, ProductCategory} from '../../product';
import {ProductService} from '../../_services/product.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  categories: ProductCategory[] = [];
  displayedColumns: string[] = ['id', 'name', 'update', 'delete'];
  dataSource: MatTableDataSource<ProductCategory>;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategoriesFromServer();
  }

  getCategoriesFromServer() {
    this.productService.getCategories().subscribe(response => {
      this.categories = response;
      this.dataSource = new MatTableDataSource<ProductCategory>(response);
    });
  }

  navigateToCategoryForm(categoryId?) {
    if (categoryId) {
      this.router.navigateByUrl(`products/category/form/${categoryId}`);
    } else {
      this.router.navigateByUrl(`products/category/form`);
    }
  }

  deleteCategory(categoryId) {
    this.productService.deleteCategory(categoryId).subscribe(response => {
      console.log(response);
      this.getCategoriesFromServer();
    }, error => {
      console.log(error);
    });
  }

}
