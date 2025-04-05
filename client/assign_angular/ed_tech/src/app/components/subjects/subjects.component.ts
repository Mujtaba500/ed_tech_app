import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/types/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  subjects: Subject[] = []
  subjectSubscription! : Subscription
  modalOpen: boolean = false

  subjectName: string = ''
  subjectImage: any = '' 

  constructor(private router: Router, private subjectService: SubjectService){

  }


  fetchSubjects(){
    this.subjectSubscription = this.subjectService.getSubjects().subscribe((res) => {
      if(res.success){
        this.subjects = res.data
      }
      
    },
    (error) => {
      // This block will only execute if catchError is used
      console.error('Error handler:', error);
    }
  )
  }

  ngOnInit(){
    this.fetchSubjects()
  }


  onFileChange(event: any){
    this.subjectImage = event.target.files;
  }


  onSubmit(){
    const formData = new FormData()
    formData.append('subjectImg', this.subjectImage[0])
    formData.append('subjectName', this.subjectName)

    this.subjectService.createSubject(formData).subscribe((res: any) => {
      if(res.success){
        alert(res.message)
        this.fetchSubjects()
      }
    }),
    (error:any) => {
      // This block will only execute if catchError is used
      console.error('Error handler:', error);
    }
  }

  ngOnDestroy(){
    if(this.subjectSubscription){
      this.subjectSubscription.unsubscribe()
    }
  }

  
} 
