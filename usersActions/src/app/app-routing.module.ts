import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { RepositoriesPageComponent } from './components/repositories-page/repositories-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'repositories/:login', component: RepositoriesPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
