import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HistoricoComponent } from "./historico.component";

const cartRouts = [
    {path: 'cart', component: HistoricoComponent},
    
];

@NgModule({
    imports: [RouterModule.forChild(cartRouts)],
    exports: [RouterModule]
})
export class HistoricoRoutingModule {}