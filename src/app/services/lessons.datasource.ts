import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of, merge} from "rxjs";
import {Lesson} from "../model/lesson";
import {CategoriesService} from "./categories.service";
import {catchError, finalize, map, startWith, switchMap} from "rxjs/operators";
import { JokeApi } from '../model/jokeApi';
export class JokesDataSource implements DataSource<JokeApi> {

    private jokesSubject = new BehaviorSubject<JokeApi[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    data

    constructor(private categoriesService: CategoriesService) {

    }

    loadJokes(category: string, filter:string, sortDirection:string) {

        // this.loadingSubject.next(true);

        // this.categoriesService.findJokesByCategory(category, filter, sortDirection).pipe(
        //         catchError(() => of([])),
        //         finalize(() => this.loadingSubject.next(false))
        //     )
        //     .subscribe(jokes => this.jokesSubject.next(jokes));



            merge()
            .pipe(
              startWith({}),
              switchMap(() => {

                return this.categoriesService.findJokesByCategory(category, filter, sortDirection).pipe(catchError(() => of(null)));

              }),
              map(data => {

                console.log(data);
                
      
                if (data === null) {
                  return [];
                }
      
                // Only refresh the result length if there is new data. In case of rate
                // limit errors, we do not want to reset the paginator to zero, as that
                // would prevent users from re-triggering requests.
                // this.resultsLength = data.amount;
                return data.jokes;
              }),
            )
            .subscribe(data => (
                this.data = data
                ));

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

