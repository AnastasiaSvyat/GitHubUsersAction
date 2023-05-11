import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FavoriteUser } from 'src/app/shared/models/favoriteUser';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public loading$: Observable<boolean>;

  length = 0;
  pageSize = 0;
  pageIndex = 0;

  favoritesUsersList: FavoriteUser[] = [];
  private unsubscribe$ = new Subject<void>();

  favoriteLoginList: string[] = []

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.loading$ = this.userService.loading$;
  }

  public dataSource: MatTableDataSource<User> = new MatTableDataSource();

  ngOnInit(): void {
    this.updateFilter();
    this.getUsersData(0);
    this.getFavoritesList();
    this.getGitHubData();
  }

  getGitHubData() {
    this.userService.githubData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.length = res.total_count
        this.dataSource = new MatTableDataSource(res.items)
      })
  }

  updateFilter() {
    this.userService.searchInput$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.pageIndex = 0)
  }

  getUsersData(pageIndex: number) {
    this.userService.getUsers(pageIndex)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe()
  }

  openDetails(user: User) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '760px',
      height: '550px',
      data: { avatarUrl: user.avatar_url }
    });
  }

  getFavoritesList() {
    this.favoritesUsersList = this.userService.getFavoritesList().favoritesList || [];

    this.favoritesUsersList.forEach(element => {
      this.favoriteLoginList.push(element.login)
    });
  }

  addToFavorite(user: User) {
    this.favoritesUsersList.push({ login: user.login, url: user.url })
    this.favoriteLoginList.push(user.login)
    this.userService.setFavoritesUsersList(this.favoritesUsersList)
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}