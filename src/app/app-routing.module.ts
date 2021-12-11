import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CourseComponent} from "./course/course.component";
import {CategoryResolver} from "./services/course.resolver";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
        path: 'categories/:id',
        component: CourseComponent,
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
