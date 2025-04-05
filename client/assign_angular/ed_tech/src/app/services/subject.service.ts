import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from '../types/subject';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { API_URL } from 'src/injectibles';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  // apiUrl = 'http://localhost:3000'
  private subjectsSubject = new BehaviorSubject<Subject[]>([])

  subjects = this.subjectsSubject.asObservable()
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

  getSubjects(){
    return this.http.get<{ success: boolean, data:Subject[]}>(`${this.apiUrl}/subject`)
  }

  createSubject(formData: any){
    // console.log(formData)
    return this.http.post(`${this.apiUrl}/subject`, formData)
  } 

  ngOnDestroy(){
    if(this.subjectSubscription){
      this.subjectSubscription.unsubscribe()
    }
  }


}
