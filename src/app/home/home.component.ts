import {Component, OnInit, ViewChild} from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {ModalDirective} from 'ngx-bootstrap';
import {ChangePass} from '../model/changePass';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  constructor(private token: TokenStorageService, private service: UserService) { }
  changePassword: ChangePass;
  oldPass: string;
  newPass: string;
  email2Change: string;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.email2Change = this.token.getUsername();
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  changePass() {
    this.service.changePassword(this.email2Change, this.oldPass, this. newPass).subscribe(r=>{ console.log(r)});
  }

}
