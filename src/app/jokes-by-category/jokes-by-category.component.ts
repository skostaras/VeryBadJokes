import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatSort, Sort } from "@angular/material/sort";
import { JokeCategoriesService } from "../services/joke-categories.service";
import { debounceTime, distinctUntilChanged, startWith, tap, delay, switchMap, map, catchError } from 'rxjs/operators';
import { merge, fromEvent, of } from "rxjs";
import { JokeCategory } from '../model/category';
import { Joke } from '../model/joke';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'jokes-by-category',
    templateUrl: './jokes-by-category.component.html',
    styleUrls: ['./jokes-by-category.component.css']
})
export class JokesByCategoryComponent implements OnInit, AfterViewInit {

    loading = false;
    activeFlags = '';
    allComplete: boolean = false;
    jokes: Joke[] = [];
    sortedJokes: Joke[];
    jokeCategory: JokeCategory;
    displayedColumns: string[] = ['category', 'joke', 'flags'];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,
        private jokeCategoriesService: JokeCategoriesService, fb: FormBuilder) {
        this.jokeFlags = fb.group({
            nsfw: false,
            religious: false,
            political: false,
            racist: false,
            sexist: false,
            explicit: false,
        });
    }

    jokeFlags: FormGroup;

    flagOptions = [
        { name: 'nsfw', checked: false },
        { name: 'religious', checked: false },
        { name: 'political', checked: false },
        { name: 'racist', checked: false },
        { name: 'sexist', checked: false },
        { name: 'explicit', checked: false }
    ];

    ngOnInit() {
        this.jokeCategory = this.route.snapshot.data["category"];
        this.loadJokes(this.jokeCategory.description, '', 'asc');
    }


    setAll(checked: boolean) {
        this.allComplete = checked;
        // if (this.task.subtasks == null) {
        //     return;
        // }
        this.flagOptions.forEach(option => (option.checked = checked));
    }

    someComplete() {
        return this.flagOptions.filter(option => option.checked).length > 0 && !this.allComplete;
    }

    loadJokes(category: string, filter: string, sortDirection: string, flags = '') {

        this.loading = true;
        merge()
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.jokeCategoriesService.findJokesByCategory(category, filter, sortDirection, flags).pipe(catchError(() => of(null)));
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
            .subscribe(data => {
                this.jokes = data;
                this.sortedJokes = this.jokes.slice();
            }
            );

    }

    filterJokes() {
        this.allComplete = this.flagOptions.every(option => option.checked);
        this.activeFlags = ''

        this.flagOptions.forEach(flag => {
            if (this.jokeFlags.get(flag.name).value === true) {
                this.activeFlags = this.activeFlags + flag.name + ',';
            }
        });

        //removes last comma
        if (this.activeFlags.length > 0) {
            this.activeFlags = this.activeFlags.substring(0, this.activeFlags.length - 1);
        }
        this.loadJokes(this.jokeCategory.description, '', 'asc', this.activeFlags);
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

    sortData(sort: Sort) {
        console.log(this.sortedJokes);

        const data = this.jokes.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedJokes = data;
            return;
        }

        this.sortedJokes = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'category':
                    return compare(a.category, b.category, isAsc);
                default:
                    return 0;
            }
        });


        function compare(a: number | string, b: number | string, isAsc: boolean) {
            return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
        }
    }

}