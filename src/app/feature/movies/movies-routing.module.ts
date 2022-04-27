import { Routes, RouterModule } from "@angular/router";
import { MoviesPageComponent } from "./movies-page/movies-page.component";

const routes: Routes = [
    {
        path: 'movies',
        component: MoviesPageComponent
    }
]

export const MoviesRoutingModule = RouterModule.forChild(routes);