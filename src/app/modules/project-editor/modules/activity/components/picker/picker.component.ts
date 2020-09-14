import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core'
import { distinctUntilChanged, skip } from 'rxjs/operators'
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
  @Output()
  emitter: EventEmitter<any> = new EventEmitter()

  constructor(
    private pickerService: PickerService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.pickerService.onApiLoad()
    this.subscriptions.sink = this.pickerService.fileSelected$
      .pipe(skip(1))
      .subscribe((file) => {
        this.fileSelected = file
        this.emitter.emit(this.fileSelected)
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
        }
      })
  }

  ngOnDestroy(): void {
    this.pickerService.cleanData()
    this.subscriptions.unsubscribe()
  }
}
