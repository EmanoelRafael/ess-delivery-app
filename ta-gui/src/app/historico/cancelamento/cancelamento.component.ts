import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-cancelamento',
  templateUrl: './cancelamento.component.html',
  styleUrls: ['./cancelamento.component.css']
})
export class CancelamentoComponent implements OnInit {

  constructor(private router: ActivatedRoute, private storeService: StoreService) { }

  @Input() code: string = "";
  cancelRequested: boolean = false;
  orderCanceled: boolean = false;
  ret: string = "";

  printCode(): void{
    console.log(this.code);
  }

  cancelOrder(): void{
    this.cancelRequested = !this.cancelRequested;
    this.storeService.cancelOrder(this.code).subscribe((res) => {
      
      this.ret = res;
      if (this.ret == "canceled") {
        this.orderCanceled = true;
      } else {
        this.orderCanceled = false;
      }
      console.log(this.ret);
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe((object: any) => {
      this.code = <string> object['code'];
      this.printCode();
    })
  }

}
