import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root',
})

export class ProductsService {
    constructor(private http: HttpClient) { }
    getProducts() {
        return this.http.get<Product[]>('http://localhost:3000/api/products/');
    }

    getProduct(id: string) {
        return this.http.get<Product>(`http://localhost:3000/api/products/${id}`);
    }

    addProduct(product: FormData) {
        return this.http.post<Product>('http://localhost:3000/api/products/', product);
    }

    updateProduct(product: any, productId: string) {
        return this.http.put(`http://localhost:3000/api/products/${productId}`, product);
    }

    deleteProduct(id: string) {
        return this.http.delete(`http://localhost:3000/api/products/${id}`);
    }

    getProductNumber() {
        return this.http.get('http://localhost:3000/api/products/get/count');
    }
}
