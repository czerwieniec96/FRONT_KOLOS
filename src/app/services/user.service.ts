import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from '../model/UserModel';
import {EmailJson} from '../model/emailJson';
import {RoleJson} from '../model/roleJson';
import {SignUpInfo} from '../auth/signup-info';
import {ChangePass} from '../model/changePass';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private apiUrl = 'http://localhost:8080/api/users/';
  private apiRoles = 'http://localhost:8080/api/users/roles/';
  private apiPass = 'http://localhost:8080/api/users/pass/';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
  getUsers(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  deleteUser(email: string): Observable<any> {

    let email_wys: any = new EmailJson(email) ;
    console.log("to jest body :");
    console.log(email_wys);
    return this.http.delete( this.apiUrl, email_wys);
  }
  changeRole(email: string, role:string): Observable<any>{
    let changerole = new SignUpInfo();
    changerole.constructor1(email, role);
    return this.http.put(this.apiRoles, changerole);
  }

  changePassword(email: string, oldpass: string , newpass: string): Observable<any>{
    let changepass : new ChangePass(email,oldpas,newpass);
    return this.http.put(this.apiPass, changepass);
  }

}
