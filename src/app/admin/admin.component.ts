import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {SignUpInfo} from '../auth/signup-info';
import {UserModel} from '../model/UserModel';
import {EmailJson} from '../model/emailJson';
import {Roles} from '../model/Role';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  users: UserModel[];
  hideChangeRoleOption: boolean;
  selectedUser: UserModel = new UserModel();
  ChangeRoleUser: UserModel = new UserModel();
  roleToChange: string;
  deleteEmail: EmailJson;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      });
    this.userService.getUsers().subscribe(r => {
      this.users = r;
      console.log(this.users);
    });
    this.hideChangeRoleOption = true;
    console.log("USER WYBRANY");
    console.log(this.selectedUser);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(r => {
      console.log('usunięto');
    });
    window.location.reload();
  }
  istrue() {
    if(this.hideChangeRoleOption == true){
      this.hideChangeRoleOption  = false;
    }
    else {
      this.hideChangeRoleOption  = true;
    }
  }

  selectUser1(u: UserModel) {
    this.selectedUser = u;
    console.log(this.selectedUser);
  }

  changeRole() {
    this.selectedUser.roles[0].name = this.roleToChange;
    this.userService.changeRole(this.selectedUser).subscribe(r=> {console.log("zmieniono role")});
    window.location.reload();
  }
}
