import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Lesson} from "../model/lesson";
import {CategoriesService} from "./categories.service";
import {catchError, finalize} from "rxjs/operators";
import { JokeApi } from '../model/jokeApi';
export class JokesDataSource implements DataSource<JokeApi> {

    private jokesSubject = new BehaviorSubject<JokeApi[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private categoriesService: CategoriesService) {

    }

    loadJokes(category: string, filter:string, sortDirection:string) {

        this.loadingSubject.next(true);

        this.categoriesService.findJokesByCategory(category, filter, sortDirection).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(jokes => this.jokesSubject.next(jokes));

    }

    connect(collectionViewer: CollectionViewer): Observable<JokeApi[]> {
        console.log("Connecting data source");
        return this.jokesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.jokesSubject.complete();
        this.loadingSubject.complete();
    }

}

