import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../components/header/components.module";
import { StoreService } from "../store.service";
import { CancelamentoComponent } from "./cancelamento/cancelamento.component";

import { HistoricoComponent } from "./historico.component";
import { HistoricoRoutingModule } from "./historico.routing.module";

@NgModule({
    imports: [
        CommonModule,
        HistoricoRoutingModule,
        ComponentsModule
    ],
    exports: [HistoricoComponent, CancelamentoComponent],
    declarations: [
        HistoricoComponent,
        CancelamentoComponent
    ],
    providers: [StoreService]
})
export class HistoricoModule {}