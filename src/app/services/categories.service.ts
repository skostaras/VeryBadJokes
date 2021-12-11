

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";
import { Category } from '../model/category';
import { Joke } from "../model/joke";


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

    findJokesByCategory(
        courseId:number, filter = '', sortOrder = 'asc'):  Observable<Lesson[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    // getJokes(sort: string, order: SortDirection, page: number, pageSize: number): Observable<JokeApi> {
    
    //     // const requestUrl = 'https://v2.jokeapi.dev/joke/Programming,Misc?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=10';
    //     const requestUrl = 'https://v2.jokeapi.dev/joke/Any?format=json&type=single&lang=en&amount=' + pageSize;
    
    //     return this._httpClient.get<JokeApi>(requestUrl);
    //   }

}