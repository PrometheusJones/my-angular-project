import { Routes, RouterModule } from "@angular/router";
import { MovieDetailPageComponent } from "./movie-detail-page/movie-detail-page.component";
import { MoviesNewPageComponent } from "./movies-new-page/movies-new-page.component";
import { MoviesPageComponent } from "./movies-page/movies-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'movies'
    },
    {
        path: 'movies',
        pathMatch: 'full',
        component: MoviesPageComponent
    },
    {
        path: 'new',
        component: MoviesNewPageComponent
    },
    {
        path: 'movies/:movieId',
        component: MovieDetailPageComponent,
    }
]

export const MoviesRoutingModule = RouterModule.forChild(routes);