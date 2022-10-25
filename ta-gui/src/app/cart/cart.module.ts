import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../components/header/components.module";
import { StoreService } from "../store.service";

import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart.routing.module";
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
    imports: [
        CommonModule,
        CartRoutingModule,
        ComponentsModule,
    ],
    exports: [CartComponent, ConfirmComponent],
    declarations: [
        CartComponent,
        ConfirmComponent
    ],
    providers: [StoreService]
})
export class CartModule {}
