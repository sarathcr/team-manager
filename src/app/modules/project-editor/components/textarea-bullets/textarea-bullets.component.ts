import { Component, OnInit, EventEmitter, Output, Input, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-textarea-bullets',
  templateUrl: './textarea-bullets.component.html',
  styleUrls: ['./textarea-bullets.component.scss']
})
export class TextareaBulletsComponent implements OnInit,AfterViewInit {
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onEnter: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() values = []
  @Input() placeholder: string
  @Input() maxLength: number
  index = 0
  @ViewChildren('textArea') textArea: QueryList<ElementRef>;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.textArea.changes.subscribe(()=>{
      this.textArea.toArray()[this.index].nativeElement.style.height = (this.textArea.toArray()[this.index].nativeElement.scrollHeight)+"px"
      this.textArea.toArray()[this.index].nativeElement.focus()
    })
  }
  keyAction(event) {
    const element = event.target;
    switch(event.keyCode) {
      case 13 :
        event.preventDefault();
        if(this.fieldValidation(this.values[element.parentNode.dataset.index].name)){
          this.onEnter.emit({val: this.values, index: element.parentNode.dataset.index})
        }
        this.index++
        break;
      case 46 :
        event.preventDefault();
        this.onDelete.emit({val: this.values, index: element.parentNode.dataset.index})
        break;
      default:
        break
    }
  }
  onTextUpdate(data,id,index){
    this.index = index
    this.values[index] = {id: id, name: data}
    this.onUpdate.emit([...this.values])
  }
  fieldValidation(value: string) {
    if (value == null || value == undefined || value.length == 0) {
      return false;
    } else {
      return true;
    }
  }



}
