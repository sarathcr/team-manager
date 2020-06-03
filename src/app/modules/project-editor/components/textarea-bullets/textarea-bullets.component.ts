import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FieldConfig, Option } from 'src/app/shared/constants/field.model';

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
  index = 0
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){

  }

  keyAction(event, id) {
    switch(event.keyCode) {

      case 13 :
        event.preventDefault();
        if (this.configOptions.length < 5) {
          this.configOptions.push({ ...this.sampleOption });
          this.index++
        }
        setTimeout(() => {
          this.textArea.last.nativeElement.focus()
        }, 0)
        break;

      case 46 :
        event.preventDefault();
        if (this.configOptions.length > 1) {
          this.configOptions.splice(id, 1)
          this.index = this.textArea.toArray().length > id ? id : id - 1
          setTimeout(() => {
            const textAreas = this.textArea.toArray()
            const index = textAreas.length > id ? id : id - 1
            textAreas[index].nativeElement.focus();
          }, 0)
        }
        else {
          this.configOptions[0].name = ''
        }
        this.onChange.emit([...this.configOptions]);
        break;

      default:
        break
    }

  }

  onValueChange(value, i){
    this.index = i
    const newConfigOptions = [...this.configOptions];
    this.onChange.emit(newConfigOptions);
    this.textArea.toArray()[i].nativeElement.style.height = (this.textArea.toArray()[i].nativeElement.scrollHeight)+"px";
  }

  fieldValidation(value: string) {
    if (value == null || value == undefined || value.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
