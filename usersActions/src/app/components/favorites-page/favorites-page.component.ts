import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FavoriteUser } from 'src/app/shared/models/favoriteUser';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  favoriteUsersList: FavoriteUser[] = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFavoriteUsersList();
  }
  
  getFavoriteUsersList() {
    this.favoriteUsersList = this.userService.getFavoritesList().favoritesList;
  }

  deleteUser(index: number) {
    this.favoriteUsersList.splice(index, 1);
    this.setFavoritesUsersList(this.favoriteUsersList)
  }

  setFavoritesUsersList(FavoritesUsersList: FavoriteUser[]) {
    this.userService.setFavoritesUsersList(this.favoriteUsersList)
  }

  createComment(index: number) {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '460px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.favoriteUsersList[index].comment = result;
        this.setFavoritesUsersList(this.favoriteUsersList)
      }
    })
  }

}
