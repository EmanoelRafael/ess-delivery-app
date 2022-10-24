import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";

const homeRouts = [
    {path: 'home', component: HomeComponent},
];

@NgModule({
    imports: [RouterModule.forChild(homeRouts)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}