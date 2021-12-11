import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {CategoriesService} from "../services/categories.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import {LessonsDataSource} from "../services/lessons.datasource";
import { Category } from '../model/category';

@Component({
    selector: 'joke-category',
    templateUrl: './joke-category.component.html',
    styleUrls: ['./joke-category.component.css']
})
export class JokeCategoryComponent implements OnInit, AfterViewInit {

    category:Category;


    dataSource: LessonsDataSource;

    displayedColumns= ["seqNo", "description", "duration"];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,
                private categoriesService: CategoriesService) {

    }

    ngOnInit() {

        this.category = this.route.snapshot.data["category"];

        this.dataSource = new LessonsDataSource(this.categoriesService);

        this.dataSource.loadLessons(this.category.id, '', 'asc', 0, 3);

    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadLessonsPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadLessonsPage())
        )
        .subscribe();

    }

    loadLessonsPage() {
        this.dataSource.loadLessons(
            this.category.id,
            this.input.nativeElement.value,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }


}
