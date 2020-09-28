import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string
  @Input() text = ''
  @Input() type: 'text' | 'number' = 'text'
  @Input() isValid: boolean
  @Input() fullWidth = false
  @Input() variant: 'default' | 'large' = 'default'
  @Input() isValidated = false
  @Input() focus = false
  @Input() errorText = ''
  @Input() maxLength: number
  @Input() customClass: string
  @Output() searchText: EventEmitter<any> = new EventEmitter()
  @ViewChild('searchInput') searchInput: ElementRef

  constructor() {}

  ngOnInit(): void {
    if (this.focus) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus()
      }, 0)
    }
  }

  onSearchText($event: any): void {
    this.searchText.emit($event)
  }

  setFocus(focus: boolean): void {
    this.focus = focus
  }

  numberOnly($event: any, inputComponent: any): boolean {
    const value = $event.target.value
    const startPos = inputComponent.selectionStart
    const endPos = inputComponent.selectionEnd
    const charCode = $event.which ? $event.which : $event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    if (startPos !== endPos) {
      return true
    }

    if (this.maxLength && value) {
      if (value?.length >= this.maxLength) {
        console.log('maxLength')
        return false
      }
    }
    return true
  }
}
