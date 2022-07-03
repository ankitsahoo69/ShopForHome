import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { timer } from 'rxjs';
// import { CategoriesService } from '../../services/categories.service';
// import { ProductsService } from '../../services/products.service';

// @Component({
//   selector: 'app-product-form',
//   templateUrl: './product-form.component.html',
//   styleUrls: ['./product-form.component.css'],
// })
// export class ProductFormComponent implements OnInit {
//   editMode = false;
//   isSubmitted = false;
//   form: FormGroup;
//   categories = [];
//   currentProductId: string;

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private categoriesService: CategoriesService,
//     private productService: ProductsService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       name: ['', Validators.required],
//       brand: ['', Validators.required],
//       price: ['', Validators.required],
//       category: ['', Validators.required],
//       countInStock: ['', Validators.required],
//       description: ['', Validators.required],
//       richDescription: [''],
//       image: ['', Validators.required],
//       fileSource: ['', Validators.required],
//     });

//     this.categoriesService.getCategories().subscribe((categories) => {
//       this.categories = categories;
//     });

//     this.checkEditMode();
//   }

//   onSubmit() {
//     this.isSubmitted = true;
//     if (this.form.invalid) {
//       return;
//     }

//     const productFormData = new FormData();

//     productFormData.append('name', this.form.get('name').value);
//     productFormData.append('brand', this.form.get('brand').value);
//     productFormData.append('price', this.form.get('price').value);
//     productFormData.append('category', this.form.get('category').value);
//     productFormData.append('countInStock', this.form.get('countInStock').value);
//     productFormData.append('description', this.form.get('description').value);
//     productFormData.append(
//       'richDescription',
//       this.form.get('richDescription').value
//     );
//     productFormData.append('image', this.form.get('fileSource').value);

//     if (this.editMode) {
//       this.updateProduct(productFormData);
//     } else {
//       this.addProduct(productFormData);
//     }
//   }

//   private updateProduct(productFormData: FormData) {
//     this.productService
//       .updateProduct(productFormData, this.currentProductId)
//       .subscribe(() => {
//         this.isSubmitted = false;
//         this.form.reset();
//         timer(500)
//           .toPromise()
//           .then(() => {
//             this.router.navigate(['/products']);
//           });
//       });
//   }

//   private addProduct(product: FormData) {
//     this.productService.addProduct(product).subscribe(() => {
//       this.isSubmitted = false;
//       this.form.reset();
//       timer(500)
//         .toPromise()
//         .then(() => {
//           this.router.navigate(['/products']);
//         });
//     });
//   }

//   private checkEditMode() {
//     this.route.params.subscribe((params) => {
//       if (params['id']) {
//         this.editMode = true;
//         this.currentProductId = params['id'];
//         this.productService.getProduct(params['id']).subscribe((product) => {
//           this.form.controls['name'].setValue(product.name);
//           this.form.controls['brand'].setValue(product.brand);
//           this.form.controls['category'].setValue(product.category.id);
//           this.form.controls['price'].setValue(product.price);
//           this.form.controls['description'].setValue(product.description);
//           this.form.controls['richDescription'].setValue(
//             product.richDescription
//           );
//           this.form.controls['countInStock'].setValue(product.countInStock);
//         });
//       }
//     });
//   }

//   onUpload(event) {
//     const file = event.target.files[0];
//     if (file) {
//       this.form.patchValue({
//         fileSource: file,
//       });
//     }
//   }

//   cancel() {
//     this.router.navigate(['/products']);
//   }
// }
