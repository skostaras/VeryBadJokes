import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Category } from '../model/category';

@Component({
    selector: 'categories-card-list',
    templateUrl: './categories-card-list.component.html',
    styleUrls: ['./categories-card-list.component.css']
})
export class CategoriesCardListComponent implements OnInit {

    @Input()
    categories: Category[];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {

    }

}