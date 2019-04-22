import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {SignUpInfo} from '../auth/signup-info';
import {UserModel} from '../model/UserModel';
import {EmailJson} from '../model/emailJson';

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
  }

  deleteUser(emial: string) {
    console.log(emial);
    let xd: any = new EmailJson(emial);
    console.log(xd);
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
}
