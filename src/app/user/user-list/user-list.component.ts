import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  title = 'let crud';

  displayedColumns: string[] = ['id', 'name', 'surname', 'city', 'country', 'email', 'password', 'actions'];
  searchFilter = '';
  listData: MatTableDataSource<any>;
  data: User[];
  isLoadingResults = true;
  isRateLimitReached = false;
  disFilter = false;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  user: User;
  displayData = false;
  fetchId: number;
  constructor( private service: UserService, private matDialog: MatDialog) { }

  ngOnInit() {

    this.getUsers();


  }
  getUsers() {
    this.service.getUsers().subscribe(res => {
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;


      this.listData.filterPredicate = (data, filter) => {

        return (data.name.indexOf(filter) || data.surName.indexOf(filter)) !== -1;


    };
       });
  }

  getUser(id: string) {
    this.service.getUser(id).subscribe(data => {
      this.user = data;
      this.displayData = true;


    });

  }
  createUser() {
    this.service.formData = {
      id: null,
      name: '',
      surName: '',
      city: '',
      country: '',
      email: '',
      password: '',
      token: 'User'
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.matDialog.open(UserFormComponent, dialogConfig).afterClosed().subscribe(() => this.getUsers());
  }
  filterShow() {
    if (this.disFilter) {
      this.disFilter = false;
    } else {
      this.disFilter = true;
    }
  }
  applyFilter() {
    this.listData.filter = this.searchFilter.trim().toLowerCase();
  }

  clearSearch() {
    this.searchFilter = '';
    this.applyFilter();
  }

  editUser(user: User) {
    this.service.formData = user;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = user;
    this.matDialog.open(UserFormComponent, dialogConfig ).afterClosed().subscribe(() => this.getUsers());
  }
  deleteUser(itemID) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteUser(itemID).subscribe(

        err => console.log(err, 'error')
      );
    }
    this.getUsers();
  }


}
