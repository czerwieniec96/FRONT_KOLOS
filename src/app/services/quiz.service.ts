import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionClass} from '../quiz/question-class';
import {UserClass} from '../auth/UserClass';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getPMBoard(): Observable<any> {
    return this.http.get("http://localhost:8080/api/questions");
  }
  postquestion(quiz: QuestionClass): Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/questions/add",quiz);
  }

}
