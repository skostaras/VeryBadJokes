import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatSort, Sort } from "@angular/material/sort";
import { JokeCategoriesService } from "../services/joke-categories.service";
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { merge, of } from "rxjs";
import { JokeCategory } from '../model/category';
import { Joke } from '../model/joke';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
    selector: 'jokes-by-category',
    templateUrl: './jokes-by-category.component.html',
    styleUrls: ['./jokes-by-category.component.css'],
})
export class JokesByCategoryComponent implements OnInit {

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private jokeCategoriesService: JokeCategoriesService,
        formBuilder: FormBuilder,
        private localStorageService: LocalStorageService
    ) {
        this.jokeFlags = formBuilder.group({
            nsfw: false,
            religious: false,
            political: false,
            racist: false,
            sexist: false,
            explicit: false,
        });
    }

    flagOptions = [
        { name: 'nsfw', checked: false },
        { name: 'religious', checked: false },
        { name: 'political', checked: false },
        { name: 'racist', checked: false },
        { name: 'sexist', checked: false },
        { name: 'explicit', checked: false }
    ];

    jokeFlags: FormGroup;
    activeFlags: string;
    allFlagsChecked: boolean = false;
    flagsForTableFilter = new FormControl();

    displayedColumns: string[] = ['category', 'joke', 'flags'];
    loadingJokes = false;

    jokes: Joke[] = [];
    sortedJokes: Joke[];

    jokeCategory: JokeCategory;

    ngOnInit() {
        this.flagsForTableFilter.valueChanges.subscribe(() => {
            this.flagsTableFilterTrigger();
        })
        if (this.localStorageService.hasItem('activeFlags')) {
            this.setActiveFlagsFromLocalStorage();
        }
        this.jokeCategory = this.route.snapshot.data["category"];
        this.loadJokes(this.jokeCategory.description);
    }

    setActiveFlagsFromLocalStorage() {
        this.activeFlags = this.localStorageService.getItem('activeFlags')

        this.flagOptions.forEach(flag => {
            if (this.activeFlags.includes(flag.name)) {
                flag.checked = true
            }
        });

        this.jokeFlags.setValue({
            nsfw: this.getFlagStatus('nsfw'),
            religious: this.getFlagStatus('religious'),
            political: this.getFlagStatus('political'),
            racist: this.getFlagStatus('racist'),
            sexist: this.getFlagStatus('sexist'),
            explicit: this.getFlagStatus('explicit'),
        })
    }

    getFlagStatus(flag: string) {
        return this.flagOptions.filter((option) => option.name === flag)[0].checked;
    }

    flagsTrigger() {
        this.allFlagsChecked = this.flagOptions.every(option => option.checked);
        this.activeFlags = ''

        this.flagOptions.forEach(flag => {
            if (this.jokeFlags.get(flag.name).value === true) {
                this.activeFlags = this.activeFlags + flag.name + ',';
            }
        });

        //removes last comma
        if (this.activeFlags.split(',').length > 1) {
            this.activeFlags = this.activeFlags.substring(0, this.activeFlags.length - 1);
        }

        this.localStorageService.setItem('activeFlags', this.activeFlags);
    }

    setAllFlags(checked: boolean) {
        this.allFlagsChecked = checked;
        this.flagOptions.forEach(option => (option.checked = checked));
    }

    someFlagsChecked() {
        return this.flagOptions.filter(option => option.checked).length > 0 && !this.allFlagsChecked;
    }

    flagsTableFilterTrigger() {
        this.sortedJokes.forEach(joke => {
            joke.hidden = false
        });

        this.flagsForTableFilter.value.forEach(filterFlag => {
            this.sortedJokes.filter((joke) => (joke.flags[filterFlag] == false)).map(joke => {
                joke.hidden = true;
            });

        });


        this.sortedJokes = [...this.sortedJokes]

    }

    loadJokes(category: string, flags = '') {

        this.loadingJokes = true;
        merge()
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.jokeCategoriesService.getJokesByCategory(category, flags).pipe(catchError(() => of(null)));
                }),
                map(data => {
                    if (data === null) {
                        this.loadingJokes = false;
                        return [];
                    }
                    return data.jokes;
                }),
            )
            .subscribe(data => {
                this.jokes = data;
                this.sortedJokes = this.jokes.slice();
                this.loadingJokes = false;
            }
            );

    }

    sortData(sort: Sort) {

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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        // let dataSource = new MatTableDataSource(ELEMENT_DATA);
        // dataSource.filter = filterValue.trim().toLowerCase();
    }

}