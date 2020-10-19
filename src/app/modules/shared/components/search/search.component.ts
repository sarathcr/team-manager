import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Subject, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
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
  textModelChanged: Subject<string> = new Subject<string>()
  textModelChangeSubscription: Subscription

  constructor() {}

  ngOnInit(): void {
    this.textModelChangeSubscription = this.textModelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newText) => {
        this.text = newText
        this.searchText.emit(newText)
      })
    if (this.focus) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus()
      }, 0)
    }
  }
  ngOnDestroy(): void {
    this.textModelChangeSubscription.unsubscribe()
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
        return false
      }
    }
    return true
  }
}
