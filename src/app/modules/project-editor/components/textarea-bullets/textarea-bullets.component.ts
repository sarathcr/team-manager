import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';

interface Option {
  id?: number;
  name?: string;
}

@Component({
  selector: 'app-textarea-bullets',
  templateUrl: './textarea-bullets.component.html',
  styleUrls: ['./textarea-bullets.component.scss']
})
export class TextareaBulletsComponent implements OnInit,AfterViewInit {
  private _config;
  sampleOption: Option = { id: null, name: null };
  configOptions: Option[] = [];

  get config(): FieldConfig {
    return this._config;
  }
  
  @Input() set config(val: FieldConfig) {
    this.configOptions = val.options.map(option => ({ name: option.name, id: option.id }));
    this._config = val;
  };
  
  @Output() onChange = new EventEmitter()
  
  @ViewChildren('textArea') textArea: QueryList<ElementRef>;
  constructor() { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.textArea.changes.subscribe(() => {
      this.textArea.toArray().forEach( item => {
        item.nativeElement.style.height = (item.nativeElement.scrollHeight)+"px";
      } )
    })
  }
  
  keyAction(event, id) {
    switch(event.keyCode) {

      case 13 :
        event.preventDefault();
        if (this.configOptions.length < 5) {
          this.configOptions.push({ ...this.sampleOption });
        }
        setTimeout(() => {
          this.textArea.last.nativeElement.focus()
        }, 0)
        break;

      case 46 :
        event.preventDefault();
        if (this.configOptions.length > 1) {
          this.configOptions.splice(id, 1)
          setTimeout(() => {
            const textAreas = this.textArea.toArray()
            const index = textAreas.length > id ? id : id - 1
            textAreas[index].nativeElement.focus();
          }, 0)
        }
        else {
          this.configOptions[0].name = ''
        }
        break;

      default: 
        break
    }
    const newConfigOptions = [...this.configOptions];
    this.onChange.emit(newConfigOptions);
  }

  fieldValidation(value: string) {
    if (value == null || value == undefined || value.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
