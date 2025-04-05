import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectCardComponent } from './components/subject-card/subject-card.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonCardComponent } from './components/lesson-card/lesson-card.component';
import { TokenInterceptor } from './interceptor/tokenInterceptor';
import { AuthInterceptor } from './interceptor/authInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_URL } from 'src/injectibles';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    SubjectsComponent,
    SubjectCardComponent,
    LessonsComponent,
    LessonCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: API_URL,
      useValue: 'http://localhost:3000',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
