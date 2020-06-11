import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() imageURL: string
  @Output() onChange = new EventEmitter()
  public imagePath;
  imgURL: any;
  public message: string;

  constructor() { }

  ngOnInit(): void {
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
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
  }

  // Function to get and emit value on textarea
  onValueChange(imgURL: string) {
    this.imageURL = imgURL;
    this.onChange.emit(this.imageURL);
  }

}
