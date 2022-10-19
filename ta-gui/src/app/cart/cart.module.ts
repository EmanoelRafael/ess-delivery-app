import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart.routing.module";
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
    imports: [
        CommonModule,
        CartRoutingModule
    ],
    exports: [],
    declarations: [
        CartComponent,
        ConfirmComponent
    ],
    providers: []
})
export class CartModule {}