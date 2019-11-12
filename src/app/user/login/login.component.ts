import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login.service';
import { UserService } from 'src/app/shared/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  constructor(
    private service: LoginService,
    private router: Router,
    private userService: UserService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit() {}
  onSubmit(user: NgForm) {
    this.service.login(user.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.id);
        const token = localStorage.getItem('token');
        if (token === 'Admin') {
          this.router.navigate(['/user/list']);
        } else {
          this.router.navigate(['/weather']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  createUser() {
    this.userService.formData = {
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
    dialogConfig.data = {isRegister: true};
    dialogConfig.width = '60%';
    this.matDialog
      .open(UserFormComponent, dialogConfig)
      .afterClosed();
  }
}
