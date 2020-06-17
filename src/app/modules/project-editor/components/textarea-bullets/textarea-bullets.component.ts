import { Component, OnInit, ViewChildren, QueryList, Input, ElementRef, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { FieldConfig, Option } from 'src/app/shared/constants/field.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-textarea-bullets',
  templateUrl: './textarea-bullets.component.html',
  styleUrls: ['./textarea-bullets.component.scss']
})
export class TextareaBulletsComponent implements OnInit, AfterContentChecked {

  @Input() config: FieldConfig
  @Input() options: Option[]
  @Input() options$: Observable<Object[]>
  @Output() onChange = new EventEmitter()
  @ViewChildren('textArea') textArea: QueryList<ElementRef>;
  index = 0
  initResize = false;
  initialScrollHeight: number;
  timeOut: any
  sampleOption: Option = { id: null, name: null };
  configOptions: Option[] = [];
  limit = 0
  focus = false;

  constructor() { }

  ngOnInit(): void {
    this.limit = this.config.limit;
    this.optionInit()
  }

  ngAfterContentChecked() {
    if (this.textArea) {
      this.textArea.toArray().forEach(item => {
        item.nativeElement.style.height = (item.nativeElement.scrollHeight) + "px";
      })
    }
  }

  optionInit() {
    if (this.options$) {
      this.options$.subscribe(data => {
        if (data?.length) {
          this.configOptions = data
        } else {
          this.configOptions = [{ ...this.sampleOption }]
        }
      })
    } else {
      this.configOptions = [{ ...this.sampleOption }]
    }
  }

  isFirefox() {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      return true
    }
    return false
  }

  keyAction(event, id) {
    switch (event.keyCode) {
      case 13: // Enter
        event.preventDefault();
        if (this.config.limit == 0) {
          this.limit = this.configOptions.length + 1
        }
        if (this.configOptions.length < this.limit && this.configOptions[this.configOptions.length - 1].name) {
          this.configOptions.push({ ...this.sampleOption });
          this.index++
        }
        this.timeOut = setTimeout(() => {
          this.textArea.last.nativeElement.focus()
        }, 0)
        break

      case 46:  // delete
        event.preventDefault();
        if (this.configOptions.length > 1) {
          this.configOptions.splice(id, 1)
          this.index = this.textArea.toArray().length > id ? id : id - 1
          this.timeOut = setTimeout(() => {
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

      case 32: // spacebar
        if (this.configOptions[id].name?.trim()?.length) {
          var textComponent = this.textArea.toArray()[id].nativeElement
          var startPos = textComponent.selectionStart;
          var endPos = textComponent.selectionEnd;
          let string = this.configOptions[id].name
          let stringLength = string?.length
          this.configOptions[id].name = (string.slice(0, startPos) + string.slice(endPos, stringLength)).trim();
          if (!this.configOptions[id].name) {
            if (this.configOptions.length > 1) {
              this.configOptions.splice(id, 1)
              if (id - 1 >= 0) {
                this.textArea.toArray()[id - 1].nativeElement.focus();
              } else {
                this.textArea.toArray()[id + 1].nativeElement.focus();
              }
            }
            else {
              if (!this.configOptions[id].name) {
                this.configOptions[0].name = ''
              }
            }
          }
        } else {
          this.configOptions[id].name = this.configOptions[id].name?.trim()
        }
        break

      case 8: // backspace
        if (!event.target.value && this.configOptions.length > 1) {
          this.configOptions.splice(id, 1)
          if (id - 1 >= 0) {
            this.textArea.toArray()[id - 1].nativeElement.focus();
          } else {
            this.textArea.toArray()[id + 1].nativeElement.focus();
          }
          clearTimeout(this.timeOut);
        }
        break

      default:
        break
    }
  }

  onValueChange(value, i) {
    this.index = i
    if (this.isFirefox() && value.length > this.config.maxLength) {
      value = value.substring(0, this.config.maxLength)
    }
    this.configOptions[i].name = value.trim()
    let newConfigOptions = [...this.configOptions];
    if (this.configOptions.length == 1 && !this.configOptions[0].name) newConfigOptions = []
    this.onChange.emit(newConfigOptions);

  }

  setFocus() {
    this.focus = true;
  }

  onBlur(i) {
    this.focus = false;
    if (this.configOptions.length > 1 && !this.configOptions[i]?.name) {
      this.configOptions.splice(i, 1)
    }
    if (this.configOptions.length === 1 && !this.configOptions[0]?.name?.trim()) {
      this.configOptions[0].name = null
    }
  }

}
