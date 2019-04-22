import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { QuizComponent } from './quiz/quiz.component';
import {AccordionModule, ModalModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AccordionModule.forRoot(),

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
