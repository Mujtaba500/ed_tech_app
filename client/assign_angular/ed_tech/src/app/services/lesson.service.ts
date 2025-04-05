import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Inject } from '@angular/core';
import { API_URL } from 'src/injectibles';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  // apiUrl = 'http://localhost:3000'
//   private subjectsSubject = new BehaviorSubject<Subject[]>([])

//   subjects = this.subjectsSubject.asObservable()
  subjectSubscription!:Subscription

  constructor(private http:HttpClient, @Inject(API_URL) private apiUrl:string) { }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'application/json',
      // 'Cache-Control' : 'no-cache',
      // 'Pragma' : 'no-cache',
      // 'content-type': 'multipart/form-data'
    }),
    observe: "response" as 'body'
  };

  getLessons(subjectId: string){
    return this.http.get(`${this.apiUrl}/lesson/${subjectId}`)
  }

  createLesson(formData: any, subjectId:string){
    // console.log(formData)
    return this.http.post(`${this.apiUrl}/lesson/${subjectId}`, formData)
  } 

  ngOnDestroy(){
    if(this.subjectSubscription){
      this.subjectSubscription.unsubscribe()
    }
  }


}
