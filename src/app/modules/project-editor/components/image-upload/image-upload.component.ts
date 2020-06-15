import { Component, OnInit, Input } from '@angular/core';
import { AwsImgUploadService } from '../../services/aws-img-upload/aws-img-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() imageURL: string
  // @Output() onChange = new EventEmitter()
  public imagePath;
  imgURL: any;
  public message: string;
  imageFromAws

  constructor(private aws: AwsImgUploadService) { }

  ngOnInit(): void {
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    console.log(mimeType)
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

    this.aws.GetRreSignedUrl(mimeType, `creativeImage/${ new Date().getTime()}.${mimeType.split('/')[1]}`)
    .subscribe(data => {
      if (data) this.aws.uploadImage(data.uploadURL, files[0])
      .subscribe(da => {
        this.imageFromAws = data.publicURL
      })
    })
  }

  // Function to get and emit value on textarea
  onValueChange(imgURL: string) {
    this.imageURL = imgURL;
  }

}
