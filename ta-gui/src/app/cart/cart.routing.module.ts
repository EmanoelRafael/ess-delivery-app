import { CheckoutComponent } from '../checkout/checkout.component';
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { ConfirmComponent } from "./confirm/confirm.component";

const cartRouts = [
    {path: 'cart', component: CartComponent,children: [
        {path: 'confirm', component: ConfirmComponent}
    ]},

];

@NgModule({
    imports: [RouterModule.forChild(cartRouts)],
    exports: [RouterModule]
})
export class CartRoutingModule {}
