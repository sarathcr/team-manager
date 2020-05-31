import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/constants/project.model';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() project$: Observable<Project>
  projectDescription
  status: 'inprogress' | 'done' | 'pending' = "pending"
  buttonConfig: FieldConfig = {
    label: 'MARCAR COMO HECHO',
    name: 'submit',
    field: 'button',
    id: 'submitButton',
    disabled: false,
    submitted: false,
  };
  
  constructor() { }

  ngOnInit(): void {
    this.projectDescription = ''
    this.formInit()
  }

  formInit() {
    this.project$.subscribe(data=>{
      if(data?.finalProduct){
        this.projectDescription = data.finalProduct
      }
    })
  }

  handleChange(value:string) {
    this.projectDescription = value
  }

  //Handle submit functionality
  handleSubmit() {
    const formData = {
      data:{
        finalProduct:this.projectDescription
      }
    }
    this.onSubmit.emit(formData);
  }
}
