import { CatalogComponent } from './../catalog/catalog.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../components/header/components.module";
import { StoreService } from "../store.service";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing.module";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ComponentsModule,
    ],
    exports: [HomeComponent],
    declarations: [
        HomeComponent,
        CatalogComponent
    ],
    providers: [StoreService]
})
export class HomeModule {}
