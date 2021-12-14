import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './model/category';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  jokeCategories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit() {
    this.jokeCategories$ = this.categoriesService.getAllCategories();
  }

}
