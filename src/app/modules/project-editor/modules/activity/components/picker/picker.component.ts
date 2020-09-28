import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core'
import { distinctUntilChanged, skip } from 'rxjs/operators'
import { ClearAllSetTimeouts } from 'src/app/shared/utility/timeout.utility'
import { SubSink } from '../../../../../../shared/utility/subsink.utility'
import { PickerService } from '../../services/picker.service/picker.service'

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
})
export class PickerComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink()
  fileSelected: any = null
  firstTime = false
  clearTimeout = new ClearAllSetTimeouts()
  @Output()
  emitter: EventEmitter<any> = new EventEmitter()
  @Output()
  cancelemitter: EventEmitter<any> = new EventEmitter()

  constructor(
    private pickerService: PickerService,
    private renderer: Renderer2
  ) {
    pickerService.initPicker()
    this.firstTime = true
  }

  ngOnInit(): void {
    this.pickerService.onApiLoad()
    this.subscriptions.sink = this.pickerService.fileSelected$
      .pipe(skip(1))
      .subscribe((file) => {
        this.fileSelected = file
        this.emitter.emit(this.fileSelected)
        this.cleanComponent()
      })

    this.subscriptions.sink = this.pickerService.isPickerVisible$
      .pipe(distinctUntilChanged())
      .subscribe((isVisible) => {
        if (isVisible) {
          const component = document.querySelector('#picker-container')
          const popup = document.querySelector('#ssIFrame_google')
          const iframe = document.querySelector('.picker-dialog-frame')
          if (popup) {
            this.renderer.appendChild(component, popup)
          }
          this.renderer.appendChild(component, iframe)
          document.querySelector('.picker-dialog').remove()
        } else {
          if (!this.firstTime) {
            this.cancelemitter.emit()
            this.cleanComponent()
          } else {
            this.firstTime = false
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.cleanComponent()
    this.clearTimeout.clearAll()
  }

  cleanComponent(): void {
    const pdf = document.querySelector('.picker-dialog-frame')
    const pd = document.querySelector('.picker-dialog')
    if (pdf) {
      pdf.remove()
    }
    if (pd) {
      pd.remove()
    }
    this.pickerService.cleanData()
    this.subscriptions.unsubscribe()
  }

  onClose(): void {
    this.cancelemitter.emit()
    this.clearTimeout.add = setTimeout(() => {
      this.cleanComponent()
    }, 300) // To make the closing similar to modal close
  }
}
