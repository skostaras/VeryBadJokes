

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Category } from '../model/category';
import { JokeApi } from "../model/jokeApi";

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) {

  }

  findCategoryByDescription(description: string): Observable<Category> {
    return this.http.get<Category>(`/api/categories/${description}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get('/api/categories')
      .pipe(
        map(res => res['payload'])
      );
  }

  findJokesByCategory(category = 'Any', filter = '', sortOrder = 'asc'): Observable<JokeApi> {
    const requestUrl = 'https://v2.jokeapi.dev/joke/' + category;
    return this.http.get<JokeApi>(requestUrl, {
      params: new HttpParams()
        .set('format', 'json')
        .set('type', 'single')
        .set('lang', 'en')
        .set('amount', 10)
    }
    );
  }

}
