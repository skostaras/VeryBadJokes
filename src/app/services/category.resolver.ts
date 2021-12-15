import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { JokeCategoriesService } from "./joke-categories.service";
import { JokeCategory } from '../model/category';

@Injectable()
export class CategoryResolver implements Resolve<JokeCategory> {

    constructor(private jokeCategoriesService: JokeCategoriesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JokeCategory> {
        return this.jokeCategoriesService.findCategoryByDescription(route.params['category']);
    }

}

