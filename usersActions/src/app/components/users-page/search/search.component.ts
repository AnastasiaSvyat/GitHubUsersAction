import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  @ViewChild('filterInput') filterElementRef!: ElementRef;

  constructor(
    private userService: UserService
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.filterElementRef.nativeElement, 'keyup')
      .pipe(
        map((e: KeyboardEvent | any) => {
          this.userService._loading$.next(true)
          return e?.target?.value
        }),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(v => this.userService.getUsers(1, v)),
      ).subscribe()
  }
}
