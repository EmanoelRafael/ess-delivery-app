import { Product } from './../../../common/product';
import { Cart } from '../../../common/cart';
import { Order } from '../../../common/order';
import { Client } from '../../../common/client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class StoreService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private taURL = 'http://localhost:3000';
    private clientId: number = 0;

    constructor(private http: HttpClient) { }

    public setClientId(id: number) {
        this.clientId = id;
    }

    public getClientId(): number {
        return this.clientId;
    }

    getCart(): Observable<Cart> {
        return this.http.get<Cart>(this.taURL + `/client/${this.clientId}/cart`).pipe(retry(2));
    }

    getClient(): Observable<Client> {
        return this.http.get<Client>(this.taURL + `/client/${this.clientId}`, { headers: this.headers }).pipe(retry(2));
    }

    makeOrder(): Observable<string> {
        return this.http.post<string>(this.taURL + `/client/${this.clientId}/orders`, { headers: this.headers })
    }

    getOrder(): Observable<Order> {
        return this.http.get<Order>(this.taURL + `/client/${this.clientId}/orders`, { headers: this.headers }).pipe(retry(2));
    }

    getProducts()/*: Observable<Array<Product>>*/ {
      return [
        new Product("Drone", 330.00, 'Drone DJI', 'Drone.jpg'),
        new Product("Drone", 330.00, 'Drone DJI', 'Drone.jpg')
      ]
        // return this.http.get<Array<Product>>(this.taURL + `/products`, { headers: this.headers }).pipe(retry(2));
    }

    cancelOrder(code: string): Observable<string> {
        return this.http.post<string>(this.taURL + `/client/${this.clientId}/orders/${code}`,{ headers: this.headers }).pipe(retry(2));
    }
}
