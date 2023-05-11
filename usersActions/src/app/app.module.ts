import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './components/users-page/user-details/user-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { RepositoriesPageComponent } from './components/repositories-page/repositories-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { MaterialModule } from './material/material.module';
import { SearchComponent } from './components/users-page/search/search.component';
import { CommentComponent } from './components/favorites-page/comment/comment.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersPageComponent,
    RepositoriesPageComponent,
    FavoritesPageComponent,
    UserDetailsComponent,
    SearchComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
