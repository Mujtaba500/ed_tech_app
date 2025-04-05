import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/app/types/subject';
import { API_URL } from 'src/injectibles';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.css']
})
export class SubjectCardComponent {
  //  ApiUrl = "http://localhost:3000"
   imageUrl = ''

  @Input() subject?:Subject;
  @Input() lesson?:any

  constructor(private router: Router, @Inject(API_URL) private ApiUrl:string){

  }


  ngOnChanges(){
     this.imageUrl = this.ApiUrl + `/${this.subject?.image}`
  }

  onClick(){
    this.router.navigate([`/subjects/${this.subject?.id}`])
  }

}
