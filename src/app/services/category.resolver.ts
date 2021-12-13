import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CategoriesService } from "./categories.service";
import { Category } from '../model/category';

@Injectable()
export class CategoryResolver implements Resolve<Category> {

    constructor(private categoriesService: CategoriesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
        return this.categoriesService.findCategoryByDescription(route.params['category']);
    }

}

