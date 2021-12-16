import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { JokeCategoriesService } from "../services/joke-categories.service";
import { JokeCategory } from '../model/category';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    jokeCategories: Observable<JokeCategory[]>;

    constructor(private jokeCategoriesService: JokeCategoriesService) {

    }

    ngOnInit() {
        this.jokeCategories = this.jokeCategoriesService.getAllCategories();
    }

}
