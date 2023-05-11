import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public loading$: Observable<boolean>;

  length = 0;
  pageSize = 0;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;

  constructor(
    private userService: UserService
  ){
    this.loading$ = this.userService.loading$;
  }

  public dataSource: MatTableDataSource<User> = new MatTableDataSource();


  ngOnInit(): void {
    this.updateFilter();
    this.userService.githubData$.subscribe(res => {
      this.length = res.total_count
      this.dataSource = new MatTableDataSource(res.items)
      this.dataSource.sort = this.sort;
    })
  }

  updateFilter(){
    this.userService.searchInput$.subscribe(res => this.pageIndex = 0)
  }

  getPaginatorData(data: PageEvent){
    this.userService.getUsers(data.pageIndex).subscribe()
  }

  openDetails(row: User){
    console.log(row);
    
  }

}
