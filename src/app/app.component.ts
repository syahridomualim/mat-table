import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { User } from './model/user';
import { ListService } from './service/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'mat-table';

  subscription = new SubSink()
  users!: User[]
  displayedColumn: string[] = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company']
  dataSource!: MatTableDataSource<User>
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private listService: ListService) { }

  ngOnInit(): void {

    this.subscription.add(
      this.listService.getUsers().subscribe(users => {
        this.users = users
        console.log(this.users);

        this.dataSource = new MatTableDataSource(this.users)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort

      })
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
