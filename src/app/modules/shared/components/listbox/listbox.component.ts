import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ListBoxType } from '../../constants/model/listbox.model'

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxComponent {
  private validated = false
  checkedIndex: number
  @Input() heading = ''
  @Input() listData: any
  @Input() loader = false
  @Input() type: ListBoxType = 'radio'
  @Input() label = ''
  @Input() placeholder = ''
  @Input() errorText = ''
  @Input()
  get isValidated(): boolean {
    return this.validated
  }
  set isValidated(value: boolean) {
    this.validated = value
    if (!value) {
      this.checkedIndex = null
    }
  }
  @Input() loading = false
  @Input() maxCount: number
  @Input() scroll = true
  @Input() customClass = ''
  @Output() selected = new EventEmitter()
  constructor() {}

  onChanged(checked: boolean, index: number): void {
    if (checked) {
      this.checkedIndex = index
    } else {
      this.checkedIndex = null
    }
    this.listData[index].checked = true
    this.selected.emit(this.listData[index])
  }

  checkSelect(checked: boolean, index: number): boolean {
    if (this.type === 'radio') {
      if (checked) {
        this.checkedIndex = index
      }
      this.listData[index].checked = false
      return this.checkedIndex === index
    } else {
      return false
    }
  }
}
