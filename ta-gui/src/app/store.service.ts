import { Cart } from '../../../common/cart';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class StoreService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private taURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getCart(): Observable<Cart> {
        return this.http.get<Cart>(this.taURL + "/cart").pipe(retry(2));
    }
}