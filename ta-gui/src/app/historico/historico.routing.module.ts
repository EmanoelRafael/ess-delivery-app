import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HistoricoComponent } from "./historico.component";
import { CancelamentoComponent } from "./cancelamento/cancelamento.component";

const historicoRouts = [
    {path: 'historico', component: HistoricoComponent, children: [
        {path: 'cancelamento/:code', component: CancelamentoComponent}
    ]},
    
];

@NgModule({
    imports: [RouterModule.forChild(historicoRouts)],
    exports: [RouterModule]
})
export class HistoricoRoutingModule {}