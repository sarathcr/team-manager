import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, Input, ElementRef } from '@angular/core';
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
  textAreaConfig = {
    label: '',
    name: 'textarea',
    field: 'themes',
    placeholder: '',
    id: 'themes',
    maxLength: 150,
    options: [{id: null, name: null}]
  }
  @ViewChildren('textArea') textArea: QueryList<ElementRef>;
  constructor() { }

  ngOnInit(): void {
    this.textAreaConfig = {...this.config}
  }

  ngAfterViewInit(){
    this.textArea.changes.subscribe((item)=>{
      // console.log(this.textArea)
      // this.textArea.last.nativeElement.focus();
      this.textArea.toArray().forEach( item => {
        item.nativeElement.style.height = (item.nativeElement.scrollHeight)+"px"
      } )
   })
  }

  keyAction(event) {
    const element = event.target;
    // element.style.height = (element.scrollHeight)+"px"
    // element.focus()
    switch(event.keyCode) {
      case 13 :
        event.preventDefault();
        if(this.fieldValidation(this.config.options[element.parentNode.dataset.index].name)){
          this.onEnter.emit({controller: this.config.name, val: this.config.options, index: element.parentNode.dataset.index})
        }
        break;
      case 46 :
        event.preventDefault();
        this.onDelete.emit({controller: this.config.name, val: this.config.options, index: element.parentNode.dataset.index})
        break;
      default:
        break
    }
  }

  onTextUpdate(event,index,i){
    // this.config.options[i]={id: index, name: event}
    this.onUpdate.emit({...this.textAreaConfig})
    // this.onUpdate.emit({...this.config})
  }

  fieldValidation(value: string) {
    if (value == null || value == undefined || value.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
