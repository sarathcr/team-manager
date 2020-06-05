import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input, ElementRef, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { FieldConfig, Option } from 'src/app/shared/constants/field.model';

@Component({
  selector: 'app-textarea-bullets',
  templateUrl: './textarea-bullets.component.html',
  styleUrls: ['./textarea-bullets.component.scss']
})
export class TextareaBulletsComponent implements OnInit, AfterContentChecked {
  private _config;
  sampleOption: Option = { id: null, name: null };
  configOptions: Option[] = [];
  limit = 0
  focus = false;

  get config(): FieldConfig {
    return this._config;
  }

  @Input() set config(val: FieldConfig) {
    if (val.options.length)
      this.configOptions = val.options.map(option => ({ id: option.id, name: option.name }));
    else
      this.configOptions.push({ ...this.sampleOption })
    this._config = val;
  };

  @Output() onChange = new EventEmitter()

  @ViewChildren('textArea') textArea: QueryList<ElementRef>;
  index = 0
  initResize = false;
  initialScrollHeight: number;
  constructor() { }

  ngOnInit(): void {
    this.limit = this.config.limit;
  }

  ngAfterContentChecked() {
    if(this.textArea){
      this.textArea.toArray().forEach(item => {
        item.nativeElement.style.height = (item.nativeElement.scrollHeight) + "px";
      })
    }

  }

  keyAction(event, id) {
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        if (this.config.limit == 0) {
          this.limit = this.configOptions.length + 1
        }
        if (this.configOptions.length < this.limit && this.configOptions[this.configOptions.length - 1].name != null) {
          this.configOptions.push({ ...this.sampleOption });
          this.index++
        }
        setTimeout(() => {
          this.textArea.last.nativeElement.focus()
        }, 0)
        break

      case 46:
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
        break

      case 32:
        if (event.target.selectionStart === 0 || (event.target.value[event.target.selectionEnd - 1] == " " || event.target.value[event.target.selectionEnd] == " ")) {
          event.preventDefault();
        }
        break

      default:
        break
    }

  }

  onValueChange(value, i) {
    this.index = i
    const newConfigOptions = [...this.configOptions];
    this.onChange.emit(newConfigOptions);
  }

  setFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
  }
  
}
