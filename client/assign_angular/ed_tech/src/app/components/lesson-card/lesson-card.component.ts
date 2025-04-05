import { Component, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { API_URL } from 'src/injectibles';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.css']
})
export class LessonCardComponent {
@Input() lesson!: any


videoUrl: string = ''

  constructor(@Inject(API_URL) private ApiUrl:string){
     
  } 


  ngOnChanges(){
     this.videoUrl = `${this.ApiUrl}/video?path=${this.lesson.videoURL}`
     console.log(this.lesson)
  }

}
