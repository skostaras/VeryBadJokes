import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { JokesByCategoryComponent } from "./jokes-by-category/jokes-by-category.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { JokeCategoriesService } from "./services/joke-categories.service";
import { HttpClientModule } from "@angular/common/http";
import { CategoryResolver } from "./services/category.resolver";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { ActiveFlagsPipe } from './pipes/active-flags-pipe';
import { TableFilterPipe } from './pipes/table-filter-pipe';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        JokesByCategoryComponent,
        ActiveFlagsPipe,
        TableFilterPipe,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        AppRoutingModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        MatCheckboxModule,
    ],
    providers: [
        JokeCategoriesService,
        CategoryResolver,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
