import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { JokeCategory } from '../model/category';
import { JokeApi } from "../model/jokeApi";

@Injectable()
export class JokeCategoriesService {

  constructor(private http: HttpClient) { }

  jokeCategories: any = {
    1: {
      id: 1,
      description: "Any",
      iconUrl: "../assets/images/any.jpeg",
    },
    2: {
      id: 2,
      description: 'Programming',
      iconUrl: "../assets/images/programmer.jpeg",
    },
    3: {
      id: 3,
      description: 'Dark',
      iconUrl: "../assets/images/dark.jpeg",
    },
    4: {
      id: 4,
      description: 'Pun',
      iconUrl: "../assets/images/pun.jpeg",
    },
    5: {
      id: 5,
      description: 'Misc',
      iconUrl: "../assets/images/misc.jpeg",
    },
  };

  getAllCategories(): Observable<JokeCategory[]> {
    const allCategories: any = Object.values(this.jokeCategories);
    return allCategories;
  }

  getCategoryByDescription(description: string): Observable<JokeCategory> {
    const categories: any = Object.values(this.jokeCategories);
    const category = categories.find(category => category.description == description);
    return category;
  }

  getJokesByCategory(category = 'Any', flags = ''): Observable<JokeApi> {
    const requestUrl = 'https://v2.jokeapi.dev/joke/' + category;
    return this.http.get<JokeApi>(requestUrl, {
      params: new HttpParams()
        .set('format', 'json')
        .set('type', 'single')
        .set('lang', 'en')
        .set('amount', 10)
        .set('blacklistFlags', flags)
    }
    );
  }

}
