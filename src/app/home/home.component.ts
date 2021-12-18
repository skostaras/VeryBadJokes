import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { JokeCategory } from '../model/category';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    jokeCategories: Observable<JokeCategory[]>;

    constructor() {

    }

}
