import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'

import {
  entityType,
  LinkContent,
} from 'src/app/modules/teacher/project-editor/constants/model/activity.model'

import { AwsImgUploadService } from 'src/app/common-shared/services/aws-img-upload/aws-img-upload.service'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { getFileType } from 'src/app/modules/shared/utility/file.utility'

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent implements OnDestroy {
  @Input() acceptedType = '*'
  @Input() entityType: entityType
  @Output() delete: EventEmitter<any> = new EventEmitter()
  @Output() add: EventEmitter<any> = new EventEmitter()

  fileURL: string | ArrayBuffer
  file: File = null
  loading = false
  subscriptions = new SubSink()

  addedFile = false
  nameFile = ''
  typeFile = ''
  disableSubmit = true
  thumbnail = ''

  linkContent: LinkContent

  constructor(private aws: AwsImgUploadService) {}

  ngOnDestroy(): void {
    this.clearData()
    this.subscriptions.unsubscribe()
  }

  clearData(): void {
    this.nameFile = ''
    this.addedFile = false
    this.disableSubmit = true
    this.file = null
    this.thumbnail = ''
    this.delete.emit()
  }

  onAdd(): void {
    if (this.addedFile) {
      const title = this.linkContent.title.split('.')
      getFileType(title[title.length - 1]).then((fileType) => {
        if (fileType) {
          this.add.emit({
            ...this.linkContent,
            previewImageUrl:
              fileType === 'IMAGE' ? this.linkContent.imageUrl : '',
            fileType,
            sourceType: 'LOCALDRIVE',
            visible: true,
            fileName: this.linkContent.title,
          })
        }
      })
    }
  }

  toBase64(file: File): void {
    const reader = new FileReader()
    reader.readAsDataURL(file)
  }

  handleServerError(error: any): void {
    this.fileURL = ''
    this.loading = false
  }

  onSelect(event: any): void {
    if (!this.file) {
      this.file = event.addedFiles[0]
      this.typeFile = this.file.type
      if (this.file) {
        const file = this.file
        this.toBase64(file)
        const mimeType = file.type
        this.loading = true
        this.subscriptions.sink = this.aws
          .getPreSignedUrl(mimeType, `${new Date().getTime()}-${file.name}`)
          .subscribe(
            (data) => {
              if (data) {
                this.fileURL = data.publicURL
                this.subscriptions.sink = this.aws
                  .uploadImage(data.uploadURL, file)
                  .subscribe(
                    () => {
                      this.loading = false
                      this.addedFile = true
                      this.nameFile = file.name
                      this.disableSubmit = false
                      this.linkContent = {
                        type: 'DOCUMENT',
                        title: data.filename,
                        url: data.publicURL,
                        imageUrl: data.publicURL,
                      }
                    },
                    (err) => {
                      this.handleServerError(err)
                    }
                  )
                if (this.file.type.includes('image')) {
                  this.thumbnail = data.publicURL
                }
              }
            },
            (err) => {
              this.handleServerError(err)
            }
          )
      }
    }
  }
}
