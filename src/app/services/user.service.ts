import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from '../model/UserModel';
import {EmailJson} from '../model/emailJson';
import {RoleJson} from '../model/roleJson';
import {SignUpInfo} from '../auth/signup-info';
import {ChangePass} from '../model/changePass';
import {UserClass} from '../auth/UserClass';
import {Score} from '../model/score';
import {delay} from 'q';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})


export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private apiUrl = 'http://localhost:8080/api/users/';
  private apiRole = 'http://localhost:8080/api/users/role/';
  private apiPass = 'http://localhost:8080/api/users/pass/';
  private apiScore = 'http://localhost:8080/api/questions/response/';
  private deleteUrl = 'http://localhost:8080/api/users/';

 // private emial_wys: EmailJson;


  constructor(private http: HttpClient) {
  }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, {responseType: 'text'});
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, {responseType: 'text'});
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteUser(id: number): Observable<any> {
    delay(1000);
    return this.http.delete(this.deleteUrl + id.toString() );
  }

  // deleteUser(email: EmailJson): Observable<any> {
  //   delay(1000);
  //   return this.http.delete(this.apiUrl, httpOptions,null, email);
  // }


  changeRole(user: UserClass): Observable<any>
  {
    console.log(user);
    return this.http.put(this.apiRole, user);
  }

  changePassword(email: string, oldpass: string, newpass: string): Observable<any> {
    let changepass: ChangePass = new ChangePass(email, oldpass, newpass);
    delay(1000);
    console.log(changepass);
    return this.http.put(this.apiPass, changepass);
  }

  updateScore(email: string, score: number): Observable<any> {
    let scor: Score = new Score(email, score);
    console.log(scor);
    return this.http.post(this.apiScore, scor);
  }
}

