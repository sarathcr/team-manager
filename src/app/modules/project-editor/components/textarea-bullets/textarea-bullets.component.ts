import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, Input } from '@angular/core';
import { Theme } from 'src/app/shared/constants/theme.model';
import { FormTwoInitData } from '../../constants/step-forms.model';
import { TextareaField } from 'src/app/shared/constants/textareaField.modal';

@Component({
  selector: 'app-textarea-bullets',
  templateUrl: './textarea-bullets.component.html',
  styleUrls: ['./textarea-bullets.component.scss']
})
export class TextareaBulletsComponent implements OnInit,AfterViewInit {
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Input() config: TextareaField[];
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    console.log(this.config)
  }

}
