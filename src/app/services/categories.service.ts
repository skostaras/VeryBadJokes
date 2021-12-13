

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {merge, Observable, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {Lesson} from "../model/lesson";
import { Category } from '../model/category';
import { Joke } from "../model/joke";
import { SortDirection } from "@angular/material/sort";
import { JokeApi } from "../model/jokeApi";


@Injectable()
export class CategoriesService {

    constructor(private http:HttpClient) {

    }

    findCategoryById(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`/api/categories/${categoryId}`);
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get('/api/categories')
            .pipe(
                map(res => res['payload'])
            );
    }

    // findLessonsByCategory(
    //     courseId:number, filter = '', sortOrder = 'asc'):  Observable<Lesson[]> {
    //         this.findJokes();

    //     return this.http.get('/api/lessons', {
    //         params: new HttpParams()
    //             .set('courseId', courseId.toString())
    //             .set('filter', filter)
    //             .set('sortOrder', sortOrder)
    //     }).pipe(
    //         map(res =>  res["payload"])
    //     );
    // }

    findJokesByCategory(category = 'Any', filter = '', sortOrder = 'asc'):  Observable<JokeApi> {
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

    findJokes() {

        merge()
          .pipe(
            startWith({}),
            switchMap(() => {
              return this.getJokes(
              ).pipe(catchError(() => of(null)));
            }),
            map(data => {
    
              if (data === null) {
                return [];
              }
    
              // Only refresh the result length if there is new data. In case of rate
              // limit errors, we do not want to reset the paginator to zero, as that
              // would prevent users from re-triggering requests.
            //   this.resultsLength = data.amount;
              return data.jokes;
            }),
          )
        //   .subscribe(data => (this.data = data));
    }
    

    getJokes(pageSize: number = 10): Observable<JokeApi> {
        const requestUrl = 'https://v2.jokeapi.dev/joke/Any?format=json&type=single&lang=en&amount=' + pageSize;
        return this.http.get<JokeApi>(requestUrl);
      }

}
