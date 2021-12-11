import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {JokeCategoryComponent} from "./joke-category/joke-category.component";
import {CategoryResolver} from "./services/category.resolver";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
        path: 'categories/:id',
        component: JokeCategoryComponent,
        resolve: {
            course: CategoryResolver
        }
    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
