import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reposytory } from 'src/app/shared/models/repository';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-repositories-page',
  templateUrl: './repositories-page.component.html',
  styleUrls: ['./repositories-page.component.scss']
})
export class RepositoriesPageComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  repositories!: Observable<any>;
  dataSource: MatTableDataSource<Reposytory> = new MatTableDataSource<Reposytory>();
  login: string;

  public loading$: Observable<boolean>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.loading$ = this.userService.loading$;
    this.login = this.activatedRoute.snapshot.params['login'];
  }

  ngOnInit(): void {
    this.getRepositories();
  }

  getRepositories() {
    this.userService.getUserRepositories(this.login)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.repositories = this.dataSource.connect();
      })
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}