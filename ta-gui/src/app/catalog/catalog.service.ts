import { Product } from './../../../../common/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor() { }

  get catalog(){
    return [
      new Product('Drone', 5000, 'Drone DJI', 'Drone.jpg'),
      new Product('Echo Dot', 400, 'Echo Dot', 'Echo Dot.jpg'),
      new Product('Fire Tv', 200, 'Fire TV', 'Fire TV.jpg'),
    ];
  }
}
