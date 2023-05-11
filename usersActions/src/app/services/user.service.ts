import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, retry, tap } from 'rxjs';
import { GithubData } from '../shared/models/githubData';
import { Reposytory } from '../shared/models/repository';
import { FavoriteUser } from '../shared/models/favoriteUser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading$.asObservable();

  private _githubData$: Subject<GithubData> = new Subject<GithubData>();
  public githubData$ = this._githubData$.asObservable();

  private _searchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchInput$ = this._searchInput$.asObservable();


  constructor(
    private http: HttpClient,
    public toastr: ToastrService,
  ) { }

  getUsers(pageNumber: number, login?: string): Observable<GithubData> {
    this._loading$.next(true)

    if (login != undefined) {
      this._searchInput$.next(login)
    } else {
      this.searchInput$.subscribe(res => login = res)
    }

    const url = `https://api.github.com/search/users?q=${login}%20in:login&page=${pageNumber}&per_page=5`;
    return this.http.get<GithubData>(url)
      .pipe(
        retry(3),
        tap({
          next: (response: GithubData) => {
            this._githubData$.next(response);
          },
          error: (response: ErrorEvent) => {
            if (response.error && response.error.message) {
              this.toastr.error(response.error.message)
            }
            this._loading$.next(false)
          },
          complete: () => this._loading$.next(false)
        })
      )
  }

  getUserRepositories(login: string): Observable<Reposytory[]> {
    this._loading$.next(true)

    const url = `https://api.github.com/users/${login}/repos`;
    return this.http.get<Reposytory[]>(url)
      .pipe(
        retry(3),
        tap({
          error: (response: ErrorEvent) => {
            if (response.error && response.error.message) {
              this.toastr.error(response.error.message)
            }
            this._loading$.next(false)
          },
          complete: () => this._loading$.next(false)
        })
      )
  }

  getFavoritesList() {
    if (localStorage.getItem('favorites')) {
      return JSON.parse(localStorage.getItem('favorites') || '')
    }
    return [];
  }

  setFavoritesUsersList(favoritesList: FavoriteUser[]) {
    localStorage.setItem('favorites', JSON.stringify({ favoritesList }))
    this.toastr.error('Favorite list has been updated!')
  }

  setFavoriteEmails(favoritesList: string[]) {
    localStorage.setItem('favoritesEmails', JSON.stringify({ favoritesList }))
  }

}
