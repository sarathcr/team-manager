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
import { LinkContent } from 'src/app/modules/project-editor/constants/model/activity.model'
import { CreationService } from 'src/app/modules/project-editor/modules/activity/services/creation/creation.service'
import { getFileType } from '../../utility/file.utility'
import { isNonFunctionalKey } from '../../utility/keyboard.utility'
import { SubSink } from '../../utility/subsink.utility'
import { ClearAllSetTimeouts } from '../../utility/timeout.utility'
@Component({
  selector: 'app-material-link',
  templateUrl: './material-link.component.html',
  styleUrls: ['./material-link.component.scss'],
})
export class MaterialLinkComponent implements OnInit, OnDestroy {
  @Input() linkTitle = ''
  @Output() updateDetails = new EventEmitter()

  link = ''
  thumbnail = ''
  status = 'default'
  linkContent: LinkContent
  loading = false
  focus = true
  inputTextChange = true
  subscriptions = new SubSink()
  clearTimeouts = new ClearAllSetTimeouts()
  @ViewChild('input') input: ElementRef
  constructor(private creationService: CreationService) {}

  ngOnInit(): void {
    this.setFocus()
    this.clearTimeouts.add = setTimeout(() => {
      this.input.nativeElement.focus()
    }, 0)
  }

  ngOnDestroy(): void {
    this.link = ''
    this.updateDetails.emit({}) // emit empty object on tab change or close
    this.subscriptions.unsubscribe()
    this.clearTimeouts.clearAll()
  }

  setFocus(): void {
    this.focus = true
  }
  unsetFocus(): void {
    this.focus = false
  }

  handleKeyPress(event: any): void {
    if (this.status === 'failed' && isNonFunctionalKey(event.keyCode)) {
      this.status = 'default'
      this.inputTextChange = true
    }
    if (this.status === 'default') {
      this.inputTextChange = true
    }
    const enterKey = 13
    if (event.keyCode === enterKey && this.status === 'default') {
      this.handleSubmit()
    }
  }

  changeStatus(): void {
    this.inputTextChange = true
    this.resetThumbNail()
  }

  handleSubmit(): void {
    if (this.validLink() && this.status === 'default') {
      this.inputTextChange = false
      this.status = 'loading'
      this.creationService.getLinkDetails(this.link).subscribe((data) => {
        if (data.title) {
          this.status = 'success'
        } else {
          this.status = 'failed'
        }
        this.linkContent = { ...data, status: this.status }
        this.emitDetails()
      })
    }
    if (this.status === 'failed') {
      this.resetAll()
    }
  }

  emitDetails(): void {
    getFileType(this.linkContent.type || 'WEB').then((fileType) => {
      this.updateDetails.emit({
        ...this.linkContent,
        previewImageUrl: this.linkContent.imageUrl,
        fileType: fileType || 'WEB',
        sourceType: 'WEB',
        visible: true,
        fileName: this.linkContent.title,
      })
    })
  }

  resetThumbNail(): void {
    this.status = 'default'
    this.subscriptions.sink = this.creationService
      .resetLinkDetails()
      .subscribe((data) => {
        this.linkContent = { ...data, status: this.status }
        this.emitDetails()
        this.input.nativeElement.focus()
      })
  }

  resetAll(): void {
    this.link = ''
    this.resetThumbNail()
    this.clearTimeouts.add = setTimeout(() => {
      this.input.nativeElement.focus()
    }, 1)
  }

  validLink(): boolean {
    const pattern = new RegExp(
      '^(https?://)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}.){3}\\d{1,3}))' + // OR ip (v4) address
      '(:\\d+)?(/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(#[-a-z\\d_]*)?$', // fragment locater
      'i'
    )
    return pattern.test(this.link)
  }
}
