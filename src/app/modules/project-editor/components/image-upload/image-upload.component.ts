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
  files: File[] = [];
  @Input() imageURL: string
  @Output() onChange = new EventEmitter()
  public imagePath;
  imgURL: any;
  public message: string;
  imageFromAws

  constructor(private aws: AwsImgUploadService) { }

  ngOnInit(): void {
    
  }

  onSelect(event) {
    if (!this.files.length) {
      this.files = [...event.addedFiles]
      const mimeType = this.files[0].type
      this.aws.GetPreSignedUrl(mimeType, `creativeImage/${new Date().getTime()}.${mimeType.split('/')[1]}`)
        .subscribe(data => {
          if (data) this.aws.uploadImage(data.uploadURL, this.files[0])
            .subscribe(() => {
              this.imageFromAws = data.publicURL
              this.onChange.emit(data.publicURL)
            })
        })
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
