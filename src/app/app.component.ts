import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { JokeCategory } from './model/category';
import { JokeCategoriesService } from './services/joke-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  jokeCategories: Observable<JokeCategory[]>;

  constructor(private jokeCategoriesService: JokeCategoriesService) {

  }

  ngOnInit() {
    this.jokeCategories = this.jokeCategoriesService.getAllCategories();
  }

  onHomePageLoaded(homePage) {
    homePage.jokeCategories = this.jokeCategories;
  }

}
