import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Category } from '../model/category';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    categories: Category[];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {

    }

}









