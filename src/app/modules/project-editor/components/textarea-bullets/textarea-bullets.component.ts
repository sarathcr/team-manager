import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, Input, ElementRef } from '@angular/core';
// import { Theme } from 'src/app/shared/constants/theme.model';
// import { FormTwoInitData } from '../../constants/step-forms.model';
// import { TextareaField } from 'src/app/shared/constants/textareaField.modal';
import { FieldConfig } from 'src/app/shared/constants/field.model';

@Component({
  selector: 'app-textarea-bullets',
  templateUrl: './textarea-bullets.component.html',
  styleUrls: ['./textarea-bullets.component.scss']
})
export class TextareaBulletsComponent implements OnInit,AfterViewInit {
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onEnter: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() config: FieldConfig;
  @ViewChildren('textArea') textArea: QueryList<ElementRef>;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.textArea.changes.subscribe(()=>{
      this.textArea.last.nativeElement.focus();
   })
  }
  keyAction(event) {
    const element = event.target;
    element.style.height = (element.scrollHeight)+"px"
    switch(event.keyCode) {
      case 13 :
        event.preventDefault();
        if(this.fieldValidation(this.config.options[element.parentNode.id-1].name)){
          this.onEnter.emit({controller: this.config.name, val: this.config.options, index: element.parentNode.id-1})
        }
        break;
      case 46 :
        event.preventDefault();
        this.onDelete.emit({controller: this.config.name, val: this.config.options, index: element.parentNode.id-1})
        break;
      default:
        break
    }
  }
  keyUpAction(event){
    this.onUpdate.emit({controller: this.config.name, val: this.config.options})
  }
  fieldValidation(value: string) {
    if (value == null || value == undefined || value.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
