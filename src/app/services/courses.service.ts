

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";
import { Category } from '../model/category';


@Injectable()
export class CategoriesService {

    constructor(private http:HttpClient) {

    }

    findCategoryById(categoryId: number): Observable<Category> {
        return this.http.get<Category>(`/api/categories/${categoryId}`);
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get('/api/categories')
            .pipe(
                map(res => res['payload'])
            );
    }

    findAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    findJokes(
        courseId:number, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

}