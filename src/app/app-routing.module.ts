import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { JokesByCategoryComponent } from "./jokes-by-category/jokes-by-category.component";
import { CategoryResolver } from "./services/category.resolver";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: 'categories/:category',
        component: JokesByCategoryComponent,
        resolve: {
            category: CategoryResolver
        }
    },
    {
        path: "**",
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
