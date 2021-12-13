import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatSort } from "@angular/material/sort";
import {CategoriesService} from "../services/categories.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, switchMap, map, catchError} from 'rxjs/operators';
import {merge, fromEvent, of} from "rxjs";
import {JokesDataSource} from "../services/lessons.datasource";
import { Category } from '../model/category';
import { Joke } from '../model/joke';

@Component({
    selector: 'joke-category',
    templateUrl: './joke-category.component.html',
    styleUrls: ['./joke-category.component.css']
})
export class JokeCategoryComponent implements OnInit, AfterViewInit {

    data: Joke[] = [];
    category:Category;
    dataSource: JokesDataSource;
    jokeData: Joke[] = [];
    displayedColumns: string[] = ['category', 'joke', 'flags'];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,
                private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.category = this.route.snapshot.data["category"];
        this.dataSource = new JokesDataSource(this.categoriesService);
        this.loadJokes(this.category.description, '', 'asc');

        setTimeout(() => {
            console.log(this.data);    
        }, 1000);
        
        
        
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

    ngAfterViewInit() {

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadJokesPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange)
        .pipe(
            tap(() => this.loadJokesPage())
        )
        .subscribe();

    }

    loadJokesPage() {
        this.dataSource.loadJokes(
            this.category.description,
            this.input.nativeElement.value,
            this.sort.direction);
    }

    


}

