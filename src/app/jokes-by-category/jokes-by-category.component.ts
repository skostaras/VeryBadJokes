import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { JokeCategoriesService } from "../services/joke-categories.service";
import { debounceTime, distinctUntilChanged, startWith, tap, delay, switchMap, map, catchError } from 'rxjs/operators';
import { merge, fromEvent, of } from "rxjs";
import { JokeCategory } from '../model/category';
import { Joke } from '../model/joke';

@Component({
    selector: 'jokes-by-category',
    templateUrl: './jokes-by-category.component.html',
    styleUrls: ['./jokes-by-category.component.css']
})
export class JokesByCategoryComponent implements OnInit, AfterViewInit {

    loading = false;
    data: Joke[] = [];
    jokeCategory: JokeCategory;
    displayedColumns: string[] = ['category', 'joke', 'flags'];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,
        private jokeCategoriesService: JokeCategoriesService) {
    }

    ngOnInit() {
        this.jokeCategory = this.route.snapshot.data["category"];
        this.loadJokes(this.jokeCategory.description, '', 'asc');
    }

    loadJokes(category: string, filter: string, sortDirection: string) {

        this.loading = true;
        merge()
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.jokeCategoriesService.findJokesByCategory(category, filter, sortDirection).pipe(catchError(() => of(null)));
                }),
                map(data => {
                    this.loading = false;
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

        // fromEvent(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         debounceTime(150),
        //         distinctUntilChanged(),
        //         tap(() => {
        //             this.loadJokesPage();
        //         })
        //     )
        //     .subscribe();

        // merge(this.sort.sortChange)
        //     .pipe(
        //         tap(() => this.loadJokesPage())
        //     )
        //     .subscribe();

    }

}

