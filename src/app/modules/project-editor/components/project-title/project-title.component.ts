import { Component, OnInit, ElementRef, ViewChild, Input, Output,EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {
  @ViewChild('titleInput') inputElement: ElementRef;
  @Input() value: any;
  @Input() maxLength: number;
  @Input() placeholder: any;
  @Output() blur= new EventEmitter()
  projectTitle: string;
  showInputfield = true;
  projectId: number;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    if(this.value){
      this.showInputfield = false;
    }
  }

  // Function to show or hide the input text field.
  toggleInputfield(): void {
    this.showInputfield = true;
    setTimeout(() => this.inputElement.nativeElement.focus(), 0);
  }

  // Function to handle blur event of input field.
  handleBlur(event: Event): void {
    const title = (<HTMLInputElement>event.target).value;
    if(title){
      this.showInputfield=false;
    }else {
      this.showInputfield=true;
    }
    this.blur.emit(event)
  }
}
