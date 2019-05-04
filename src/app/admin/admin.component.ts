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
  hideChangeRoleOption :boolean;
  selectedUser: UserModel = new UserModel();
  ChangeRoleUser: UserModel = new UserModel();
  roleToChange: string = "ROLE_USER";

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

  deleteUser(emial: string) {
    this.userService.deleteUser(emial).subscribe(r => {
      console.log('usunięto');
    });
    //window.location.reload();
  }

  istrue(){
    if(this.hideChangeRoleOption == true){
      this.hideChangeRoleOption  = false;
    }
    else{
      this.hideChangeRoleOption  = true;
    }
  }

  selectUser1(u: UserModel) {
    this.selectedUser = u;
  }



  // changeRole() {
  //   this.ChangeRoleUser = this.selectedUser;
  //   this.ChangeRoleUser.roles = this.roleToChange;
  //   console.log(this.ChangeRoleUser);
  //   this.userService.changeRole(this.ChangeRoleUser).subscribe(r=>{console.log(this.ChangeRoleUser});
  // }
}
