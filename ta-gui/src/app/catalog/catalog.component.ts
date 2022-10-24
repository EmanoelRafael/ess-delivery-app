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
  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.productsList = this.catalogService.catalog;
  }

  addProductToCart() {
    alert('Produto adicionado ao carrinho')
  }
}
