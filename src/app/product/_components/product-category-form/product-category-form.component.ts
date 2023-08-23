import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../_services/product.service';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {

  isCreate = true;
  categoryFormGroup: FormGroup;
  categoryId = null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.categoryFormGroup = this.formBuilder.group({
      id: [''],
      name: ['']
    });

    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.categoryId);
    if (this.categoryId) {
      this.isCreate = false;
      this.getChosenCategory(this.categoryId);
    }
  }

  getChosenCategory(categoryId) {
    this.productService.getSingleProduct(categoryId).subscribe(response => {
      this.categoryFormGroup.patchValue(categoryId);
    });
  }

  saveCategory() {
    if (this.isCreate) {
      return this.productService.postCategory(this.categoryFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('products/categories/list');
      }, error => {
        console.log(error);
      });
    } else {
      return this.productService.putCategory(this.categoryId, this.categoryFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('products/categories/list');
      }, error => {
        console.log(error);
      });
    }
  }

}
