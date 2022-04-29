import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MoviesListItemComponent } from './movies-list-item/movies-list-item.component';
import { MoviesNewPageComponent } from './movies-new-page/movies-new-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';
import { MovieEditPageComponent } from './movie-edit-page/movie-edit-page.component';



@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesPageComponent,
    MoviesListItemComponent,
    MoviesNewPageComponent,
    MovieDetailPageComponent,
    MovieEditPageComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    MoviesListComponent,
    MoviesPageComponent,
    MoviesListItemComponent,
    MoviesNewPageComponent
  ],
  providers: [
    DatePipe
  ]
})
export class MoviesModule { }
