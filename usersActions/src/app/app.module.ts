import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './components/users-page/user-details/user-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { RepositoriesPageComponent } from './components/repositories-page/repositories-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersPageComponent,
    RepositoriesPageComponent,
    FavoritesPageComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
