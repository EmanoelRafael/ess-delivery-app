import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreService } from "../store.service";

import { HistoricoComponent } from "./historico.component";
import { HistoricoRoutingModule } from "./historico.routing.module";

@NgModule({
    imports: [
        CommonModule,
        HistoricoRoutingModule
    ],
    exports: [],
    declarations: [
        HistoricoComponent
    ],
    providers: [StoreService]
})
export class HistoricoModule {}