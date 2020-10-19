import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

import { UploadVariant } from '../../constants/model/image-upload.model'
import { AwsImgUploadService } from '../../services/aws-img-upload/aws-img-upload.service'
import { SubSink } from '../../utility/subsink.utility'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageUploadComponent implements OnDestroy, OnInit {
  @Input() maxFileSize: number
  @Input() acceptedType: string
  @Input() label: string
  @Input() imageURL: string | ArrayBuffer
  @Input() uploadPath: string
  @Input() jsonCopy = false
  @Input() variant: UploadVariant = 'dropzone'
  @Output() fileSelect = new EventEmitter()
  modalRef: BsModalRef

  @ViewChild('modalUploadRejection') modalUploadRejection: TemplateRef<any>

  files: File[] = []
  loading = false
  subscriptions = new SubSink()
  imageLoaded = true

  constructor(
    private aws: AwsImgUploadService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    if (this.imageURL) {
      this.imageLoaded = false
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  toBase64(file: File): void {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.imageURL = reader.result
    }
  }

  onSelect(event: any): void {
    if (
      event.rejectedFiles?.length &&
      event.rejectedFiles[0].reason === 'size'
    ) {
      this.modalRef = this.modalService.show(this.modalUploadRejection, {
        class: 'common-modal modal-dialog-centered',
      })
    }
    if (!this.files.length) {
      this.files = [...event.addedFiles]
      if (this.files.length) {
        const file = this.files[0]
        this.toBase64(file)
        const mimeType = file.type
        this.loading = true
        const filename = `${new Date().getTime()}-${file.name
          .split('.')
          .map((item) => item.replace(/[^A-Z0-9]+/gi, '_'))
          .join('.')}`
        this.subscriptions.sink = this.aws
          .getPreSignedUrl(
            mimeType,
            `${this.uploadPath ? this.uploadPath : ''}${filename}`
          )
          .subscribe(
            (data) => {
              if (data) {
                this.subscriptions.sink = this.aws
                  .uploadImage(data.uploadURL, file)
                  .subscribe(
                    () => {
                      if (!this.jsonCopy) {
                        this.fileSelect.emit(data.publicURL)
                        this.loading = false
                      } else {
                        this.subscriptions.sink = this.aws
                          .getPreSignedUrl(
                            mimeType,
                            `${
                              this.uploadPath ? this.uploadPath : ''
                            }${filename}.json`
                          )
                          .subscribe(
                            (dataJson) => {
                              if (dataJson) {
                                this.subscriptions.sink = this.aws
                                  .uploadImage(dataJson.uploadURL, {
                                    data: this.imageURL,
                                  })
                                  .subscribe(
                                    () => {
                                      this.fileSelect.emit(data.publicURL)
                                      this.loading = false
                                    },
                                    (err) => {
                                      this.handleServerError(err)
                                    }
                                  )
                              }
                            },
                            (err) => {
                              this.handleServerError(err)
                            }
                          )
                      }
                    },
                    (err) => {
                      this.handleServerError(err)
                    }
                  )
              }
            },
            (err) => {
              this.handleServerError(err)
            }
          )
      }
    }
  }

  onRemove(event: any): void {
    event.stopPropagation()
    this.imageURL = ''
    this.files = []
    this.fileSelect.emit('')
  }

  handleServerError(error: any): void {
    this.imageURL = ''
    this.loading = false
  }

  transformData(files: any): void {
    if (this.files) {
      this.imageURL = ''
      this.files = []
    }
    this.onSelect({ addedFiles: files })
  }
  // object-fit: cover not loading issue fix
  onPreviewLoaded(): void {
    this.imageLoaded = true
  }

  // show upload image option  if error occurs
  onPreviewError(): void {
    this.imageLoaded = true
    this.imageURL = ''
  }

  sizeInMB(): object {
    return { value: this.maxFileSize / Math.pow(1024, 2) }
  }

  declineModal(event: any): void {
    this.modalRef.hide()
  }
}
