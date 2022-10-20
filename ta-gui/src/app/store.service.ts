import { Cart } from '../../../common/cart';
import { Client } from '../../../common/client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class StoreService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private taURL = 'http://localhost:3000';
    private clientId:number = 0;

    constructor(private http: HttpClient) {}

    public setClientId(id:number){
        this.clientId = id;
    }

    public getClientId(): number{
        return this.clientId;
    }

    getCart(): Observable<Cart> {
        return this.http.get<Cart>(this.taURL + `/client/${this.clientId}/cart`).pipe(retry(2));
    }

    getClient(): Observable<Client> {
        return this.http.get<Client>(this.taURL + `/client/${this.clientId}`,{headers: this.headers}).pipe(retry(2));
    }
}