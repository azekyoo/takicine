import { Routes } from '@angular/router';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {ListUsersComponent} from "./pages/list-users/list-users.component";
import {AddUserComponent} from "./pages/add-user/add-user.component";
import {ListFilmsComponent} from "./pages/list-movies/list-films.component";
import {AddMovieComponent} from "./pages/add-movie/add-movie.component";
import {AddFileComponent} from "./pages/add-file/add-file.component";
import {AddReviewComponent} from "./pages/add-review/add-review.component";
import {ConnectionComponent} from "./pages/connection/connection.component";
import {ChartsComponent} from "./pages/charts/charts.component";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import {PanelAdminComponent} from "./pages/panel-admin/panel-admin.component";
import {ListReviewComponent} from "./pages/list-review/list-review.component";
import {ReviewMovieComponent} from "./pages/avis-movie/review-movie.component";

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'add-user/:id', component: AddUserComponent },
  { path: 'list-films', component: ListFilmsComponent },
  { path: 'add-film', component: AddMovieComponent },
  { path: 'add-film/:id', component: AddMovieComponent },
  { path: 'add-file/:id', component: AddFileComponent },
  { path: 'add-avis', component: AddReviewComponent },
  { path: 'add-avis/:id', component: AddReviewComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'panel-admin', component: PanelAdminComponent},
  { path: 'chart/:year', component: ChartsComponent},
  { path: 'user-page', component: UserPageComponent },
  { path: 'user-page/:idUser', component: UserPageComponent },
  { path: 'list-avis', component: ListReviewComponent },
  { path: 'list-avis/:idUser', component: ListReviewComponent },
  { path: 'avis-film/:id', component: ReviewMovieComponent },
];
