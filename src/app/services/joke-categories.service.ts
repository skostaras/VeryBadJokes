

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

  findCategoryByDescription(description: string): Observable<JokeCategory> {
    const categories: any = Object.values(this.jokeCategories);
    const category = categories.find(category => category.description == description);
    return category;
  }

  getAllCategories(): Observable<JokeCategory[]> {
    const allCategories: any = Object.values(this.jokeCategories);
    return allCategories;
  }

  findJokesByCategory(category = 'Any', flags = ''): Observable<JokeApi> {
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


  //   searchLessons(req: Request, res: Response) {

  //     const queryParams = req.query;

  //     const courseId = queryParams.courseId,
  //           filter = queryParams.filter || '',
  //           sortOrder = queryParams.sortOrder;

  //     let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == courseId).sort((l1, l2) => l1.id - l2.id);

  //     if (filter) {
  //        lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
  //     }

  //     if (sortOrder == "desc") {
  //         lessons = lessons.reverse();
  //     }

  //     setTimeout(() => {
  //         res.status(200).json({payload: lessons});
  //     },1000);

  // }

}
