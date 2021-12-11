import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CategoriesService} from "../services/categories.service";
import {map} from "rxjs/operators";
import { Category } from '../model/category';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    jokeCategories$: Observable<Category[]>;

    constructor(private coursesService: CategoriesService) {

    }

    ngOnInit() {

        const categories$ = this.coursesService.getAllCategories();

        this.jokeCategories$ = categories$.pipe(
          map(categories => categories)
        );


    }

}
