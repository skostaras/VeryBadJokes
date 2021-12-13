import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CategoriesService } from "../services/categories.service";
import { Category } from '../model/category';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    jokeCategories$: Observable<Category[]>;

    constructor(private categoriesService: CategoriesService) {

    }

    ngOnInit() {
        this.jokeCategories$ = this.categoriesService.getAllCategories();
    }

}
