import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { AwsImgUploadService } from '../../services/aws-img-upload/aws-img-upload.service';

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
  @Input() imageURL: string
  @Output() onFileSelect = new EventEmitter()
  files: File[] = [];
  loading = false

  constructor(private aws: AwsImgUploadService) { }

  ngOnInit(): void {

  }

  onSelect(event) {
    if (!this.files.length) {
      this.files = [...event.addedFiles]
      if (this.files.length) {
        const file = this.files[0]
        const mimeType = file.type
        this.loading = true;
        this.aws.GetPreSignedUrl(mimeType, `creativeImage/${new Date().getTime()}.${mimeType.split('/')[1]}`)
          .subscribe(data => {
            if (data) this.aws.uploadImage(data.uploadURL, file)
              .subscribe(() => {
                this.imageURL = data.publicURL
                this.onFileSelect.emit(data.publicURL)
                this.loading = false;
              })
            else this.loading = false
          })
      }
    }
  }

  onRemove(event) {
    event.stopPropagation()
    this.imageURL = ''
    this.files = [];
    this.onFileSelect.emit('')
  }

}
