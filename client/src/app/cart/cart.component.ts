import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductsService } from '../admin/services/products.service';
import { cartItemDetail } from '../models/cart';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  cartItems: cartItemDetail[] = [];
  endSubs: Subject<any> = new Subject();
  totalPrice: number;


  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService
  ) { }


  ngOnInit(): void {
    this.getCartDetails();
    this.getTotalPrice();
  }
  

  private getCartDetails() {
    this.cartService.cart.subscribe((res) => {
      this.cartItems = [];
      res.items.forEach((cartItem) => {
        this.productService
          .getProduct(cartItem.productId)
          .subscribe((product) => {
            this.cartItems.push({
              product: product,
              quantity: cartItem.quantity,
            })
          })
      })
    })
  }
  

  private getTotalPrice() {
    this.cartService.cart.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.productService
            .getProduct(item.productId)
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            })
        })
      }
    })
  }


  updateQuantity(event, item) {
    this.cartService.setCartItem(
      {
        productId: item.product.id,
        quantity: event.target.value
      },
      true
    )
  }


  onCheckout() {
    this.router.navigate(['/checkout']);
  }


  back() {
    this.router.navigate(['/home']);
  }

  
  delete(item: cartItemDetail) {
    this.cartService.deleteCartItem(item.product.id);
  }
}
