import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/user-data.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title: string;
  users: UserDataService[] = [];
  newOrEdit: boolean;
  constructor(
    private service: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {}
  ngOnInit() {
    if (this.service.formData.id === null) {
      this.title = 'New User';
      this.newOrEdit = true;
    } else {
      this.title = 'Edit';
      this.newOrEdit = false;
    }

  }
  onClear() {
    this.service.formData = {
      id: this.service.formData.id,
      name: null,
      surName: null,
      city: null,
      country: null,
      email: null,
      password: null,
      token: this.service.formData.token
    };
  }

  onSubmit() {
    if (this.service.formData.id === null) {
      this.service.createUser().subscribe(
        (res: any) => {

          this.dialogRef.close();
          this.service.getUsers();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.service.updateUser(this.service.formData.id).subscribe(
        res => {
          this.dialogRef.close();
        },
        err => console.log(err)
      );
    }
  }
  randomString = () => Math.random()
      .toString(36)
      .substring(2)
      .toUpperCase()

  createPassword() {
    let r = this.randomString();
    const regexNumber = /[0-9]/;
    const regexLetter = /[A-Z]/;
    let condition = true;

    while (condition) {
      if ((r.search(regexNumber) || r.search(regexLetter)) < 0) {
        r = this.randomString();
      } else {
        this.service.formData.password = r;
        condition = false;
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
