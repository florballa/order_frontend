import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Product} from '../../product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../_services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  isCreate = true;
  chosenProduct: Product[];
  categories = [];
  productFormGroup: FormGroup;
  productId = null;

  constructor(private router: Router,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.productFormGroup = this.formBuilder.group({
      id: [''],
      name: [''],
      default_price: [''],
      description: [''],
      categories: [null]
    });

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
    if (this.productId) {
      this.isCreate = false;
      this.getChosenProduct(this.productId);
    }

  }

  getCategories() {
    this.productService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  getChosenProduct(productId) {
    this.productService.getSingleProduct(productId).subscribe(response => {
      this.productFormGroup.patchValue(response);
      console.log(this.productFormGroup.value);
    });
  }

  saveProduct() {
    if (this.isCreate) {
      return this.productService.postProduct(this.productFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('products/list');
      }, error => {
        console.log(error);
      });
    } else {
      return this.productService.putProduct(this.productId, this.productFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('products/list');
      }, error => {
        console.log(error);
      });
    }
  }

}
