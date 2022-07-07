import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../admin/models/product';
import { ProductsService } from '../../admin/services/products.service';
import { CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})

export class ProductItemComponent implements OnInit {
  @Input() product: Product;


  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private productService: ProductsService
  ) { }


  ngOnInit(): void { }


  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);

    this.productService.getProduct(this.product.id).subscribe((product) => {
      const updatedProduct: Product = {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        category: product.category,
        stock: product.stock - cartItem.quantity
      }
      this.productService.updateProduct(updatedProduct, updatedProduct.id).subscribe();
    })
  }

  
  addToWishlist() {
    const wishlistItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.wishlistService.setWishlistItem(wishlistItem);
  }
}
