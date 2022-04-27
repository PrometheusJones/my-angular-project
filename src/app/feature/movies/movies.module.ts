import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesPageComponent } from './movies-page/movies-page.component';



@NgModule({
  declarations: [

    MoviesListComponent,
     MoviesPageComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
