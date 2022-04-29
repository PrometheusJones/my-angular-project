import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { MovieDetailPageComponent } from "./movie-detail-page/movie-detail-page.component";
import { MovieEditPageComponent } from "./movie-edit-page/movie-edit-page.component";
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
        path: 'movies/new',
        canActivate: [AuthGuard],
        component: MoviesNewPageComponent
    },
    {
        path: 'movies/:movieId',
        component: MovieDetailPageComponent,
    },
    {
        path: 'movies/:movieId/edit',
        canActivate: [AuthGuard],
        component: MovieEditPageComponent,
    }
]

export const MoviesRoutingModule = RouterModule.forChild(routes);