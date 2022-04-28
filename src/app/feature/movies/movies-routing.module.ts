import { Routes, RouterModule } from "@angular/router";
import { MoviesNewPageComponent } from "./movies-new-page/movies-new-page.component";
import { MoviesPageComponent } from "./movies-page/movies-page.component";

const routes: Routes = [
    {
        path: 'movies',
        component: MoviesPageComponent
    },
    {
        path: 'new',
        component: MoviesNewPageComponent
    }
]

export const MoviesRoutingModule = RouterModule.forChild(routes);