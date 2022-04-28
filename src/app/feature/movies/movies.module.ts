import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MoviesListItemComponent } from './movies-list-item/movies-list-item.component';
import { MoviesNewPageComponent } from './movies-new-page/movies-new-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesPageComponent,
    MoviesListItemComponent,
    MoviesNewPageComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    MoviesListComponent,
    MoviesPageComponent,
    MoviesListItemComponent,
    MoviesNewPageComponent
  ]
})
export class MoviesModule { }
