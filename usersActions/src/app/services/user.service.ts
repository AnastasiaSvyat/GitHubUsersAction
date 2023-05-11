import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { GithubData } from '../shared/models/githubData';

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
    private http: HttpClient
  ) { }

  getUsers(pageNumber: number, login?: string): Observable<GithubData> {

    if(login) {
      this._searchInput$.next(login)
    }else{
      this.searchInput$.subscribe(res => login = res)
    }

    const url = `https://api.github.com/search/users?q=${login}%20in:login&page=${pageNumber}&per_page=5`;
    this._loading$.next(true)
    return this.http.get<GithubData>(url)
      .pipe(
        tap({
          next: (response: GithubData) => {
            this._githubData$.next(response);
          },
          error: (response: ErrorEvent) => {
            if (response.error && response.error.message) {
              // this.toastr.error(response.error.message)
            }
          },
          complete: () => this._loading$.next(false)
        })
      )
  }

}
