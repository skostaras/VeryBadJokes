


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {CategoriesService} from "./courses.service";
import { Category } from '../model/category';



@Injectable()
export class CategoryResolver implements Resolve<Category> {

    constructor(private coursesService:CategoriesService) {

    }

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    //     return this.coursesService.findCourseById(route.params['id']);
    // }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
        return this.coursesService.findCategoryById(route.params['id']);
    }

}

