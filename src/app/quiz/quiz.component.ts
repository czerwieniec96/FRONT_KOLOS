import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestionClass} from './question-class';
import {ModalDirective} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {QuizService} from '../services/quiz.service';
import { TokenStorageService } from '../auth/token-storage.service';
import {SignUpInfo} from '../auth/signup-info';
import {UserClass} from '../auth/UserClass';
import {delay} from 'q';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  isQuestionCardShow: boolean = false;
  totalAnswered: number = 0;
  rightAnswer: number;
  questionObj = new QuestionClass();
  _est: any;
  allQuestions: any[];
  info: any;
  isadmin: boolean;
  nquestionsss: number ;
  token1: any;
  xd: QuestionClass = new QuestionClass();
  @ViewChild('submitModal') submitModal: ModalDirective;
  @ViewChild('addQuestionModal') addQuestionModal: ModalDirective;
  @ViewChild('answerModal') answerModal: ModalDirective;
  @ViewChild('questionForm') questionForm: any;
  @ViewChild('questionTest') questionTest: any;

  constructor( private toastr: ToastrService, private serv: QuizService, private token: TokenStorageService, private serviceUser: UserService) { }



  /**Method call on submit the test */
  submitTest() {
    this.rightAnswer = 0;
    this.totalAnswered = 0;
    for (let i = 0; i < this.allQuestions.length; i++) {
      if ("selected" in this.allQuestions[i] && (this.allQuestions[i]["selected"] != null)) {
        this.totalAnswered++;
        if (this.allQuestions[i]["selected"] == this.allQuestions[i]["answer"]) {
          this.rightAnswer++;
        }
    }
      this.submitModal.show();
    }
    console.log(this.info.username);
    console.log(this.rightAnswer / this.allQuestions.length);

    this.updateScore(this.info.username, (this.rightAnswer / this.allQuestions.length)* 100);

  }

  startQuiz() {
    for (let i = 0; i < this.allQuestions.length; i++) {
      if ("selected" in this.allQuestions[i]) {
        delete this.allQuestions[i]["selected"];
      }
    }
    this.questionTest.reset();
    this.isQuestionCardShow = true;
  }
  HomePage() {
    this.isQuestionCardShow = false;
  }
  addQuestion(){
    this.addQuestionModal.show();
  }
  submitAddQuestion(){
    let quesTemp = JSON.parse(JSON.stringify(this.questionObj));
    quesTemp["id"] =  this.nquestionsss+1;
   // this.allQuestions.push(quesTemp);
    this.questionForm.reset();
    this.toastr.success("Dodano pytanie!!");
    this.addQuestionModal.hide();
    this.serv.postquestion(quesTemp).subscribe(
      data => {
        console.log(quesTemp);
      });

  }
  checkAnswers(){
    this.submitModal.hide();
    this.answerModal.show();
  }

  ngOnInit() {
  this.serv.getPMBoard().subscribe(res =>{
    this.allQuestions = res;
    this.nquestionsss = this.allQuestions.length;
   // console.log(res);
  });
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

     this.token1 = this.token.getAuthorities().toString();

    if(this.token1 === 'ROLE_USER') {
      this.isadmin=false;
    }
    else {
      this.isadmin=true;
    }

  }

  reload(){
    delay(1000);
    window.location.reload();
  }

  updateScore(mail: string, score: number) {
        return this.serviceUser.updateScore(mail, score).subscribe(r => {console.log("Udało się")});
  }



}
