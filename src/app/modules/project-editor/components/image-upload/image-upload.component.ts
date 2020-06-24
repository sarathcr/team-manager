import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core'
import { AwsImgUploadService } from '../../services/aws-img-upload/aws-img-upload.service'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageUploadComponent implements OnInit {

  @Input() maxFileSize: number
  @Input() acceptedType: string
  @Input() label: string
  @Input() imageURL: string | ArrayBuffer
  @Output() fileSelect = new EventEmitter()
  files: File[] = []
  loading = false

  constructor(private aws: AwsImgUploadService) { }

  ngOnInit(): void {

  }

  toBase64(file: File): void {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.imageURL = reader.result
    }
  }

  onSelect(event): void {
    if (!this.files.length) {
      this.files = [...event.addedFiles]
      if (this.files.length) {
        const file = this.files[0]
        this.toBase64(file)
        const mimeType = file.type
        this.loading = true
        this.aws.getPreSignedUrl(mimeType, `${new Date().getTime()}-${file.name}`)
          .subscribe(data => {
            if (data) {
              this.aws.uploadImage(data.uploadURL, file)
                .subscribe(() => {
                  this.fileSelect.emit(data.publicURL)
                  this.loading = false
                },
                  err => {
                    this.handleServerError(err)
                  })
            }
          },
            err => {
              this.handleServerError(err)
            })
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

}
