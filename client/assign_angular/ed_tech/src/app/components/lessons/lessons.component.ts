import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/types/subject';
import { Subscription } from 'rxjs';
import { LessonService } from 'src/app/services/lesson.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {
  // subjects?: Subject[]
  private subjectSubscription!: Subscription
  lessons?: any[] = []
  subjectId:string | null = ''

  lessonName: string = ''
  lessonVideo :any = ''

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private authService: AuthService){
  }

  ngOnInit(){
    // this.subjectSubscription = this.subjectService.getSubjects().subscribe((res) => {
    //   this.subjects = res.data
    //   this.lessons = this.getLessons(this.subjects!)
    // })
   
    this.subjectId = this.route.snapshot.paramMap.get('id')
    this.getLessons()
  
  }

  getLessons(){

    this.lessonService.getLessons(this.subjectId!).subscribe((val:any) => {
      this.lessons = val.data
    })
  }

  onFileChange(e:any){
    this.lessonVideo = e.target.files;
  }

  onSubmit(){
    console.log("name", this.lessonName)
    console.log("ideo", this.lessonVideo);

    const formData = new FormData()
    formData.append('lessonName', this.lessonName)
    formData.append('video', this.lessonVideo[0])

    this.lessonService.createLesson(formData, this.subjectId!).subscribe({
      next: (res:any) => {
        if(res.success){
          alert(res.message)
          
        }
      },
      error: (error:any) => {
        if(error.error.message){
                  alert(error.error.message)
                }
                console.error('Error handler:', error);
      },
      complete: () => {
        this.getLessons()
      }
    })

    
  }

  ngOnDestroy(){
    if(this.subjectSubscription){
      this.subjectSubscription.unsubscribe()
    }
  }

}
