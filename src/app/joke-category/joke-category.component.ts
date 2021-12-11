import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatSort } from "@angular/material/sort";
import {CategoriesService} from "../services/categories.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import {JokesDataSource} from "../services/lessons.datasource";
import { Category } from '../model/category';

@Component({
    selector: 'joke-category',
    templateUrl: './joke-category.component.html',
    styleUrls: ['./joke-category.component.css']
})
export class JokeCategoryComponent implements OnInit, AfterViewInit {

    category:Category;
    dataSource: JokesDataSource;
    // displayedColumns= ["seqNo", "description", "duration"];
    displayedColumns: string[] = ['category', 'joke', 'flags'];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,
                private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.category = this.route.snapshot.data["category"];
        this.dataSource = new JokesDataSource(this.categoriesService);
        this.dataSource.loadJokes(this.category.id, '', 'asc');
    }

    ngAfterViewInit() {

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadLessonsPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange)
        .pipe(
            tap(() => this.loadLessonsPage())
        )
        .subscribe();

    }

    loadLessonsPage() {
        this.dataSource.loadJokes(
            this.category.id,
            this.input.nativeElement.value,
            this.sort.direction);
    }


}
