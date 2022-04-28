import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthUserInterceptor } from './auth-user.interceptor';
import { MovieService } from './movie.service';
import { MoviesModule } from '../feature/movies/movies.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MoviesModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        UserService,
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: AuthUserInterceptor
        }
      ]
    }
  }
}
