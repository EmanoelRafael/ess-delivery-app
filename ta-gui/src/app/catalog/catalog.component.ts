import { StoreService } from 'src/app/store.service';
import { CatalogService } from './catalog.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../common/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  productsList: Product[] = [];
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getProducts().subscribe( (res) => {
      console.log(res);
      this.productsList = res;
    });
  }

  addProductToCart(product: Product, index: number) {
    this.storeService.addProductToCart(index).subscribe (res => console.log(res));
    alert(`Produto ${product.name} adicionado ao carrinho!`);
  }
}
