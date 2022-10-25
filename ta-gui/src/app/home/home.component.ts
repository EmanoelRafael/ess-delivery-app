import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../common/product';
import { StoreService } from '../store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  products: Array<Product> = new Array<Product>();

  ngOnInit(): void {
    // this.products = this.storeService.getProducts();
    this.storeService.getProducts().subscribe((res) => {
      this.products = <Array<Product>> res;
      // console.log(res);
    })
  }

}
