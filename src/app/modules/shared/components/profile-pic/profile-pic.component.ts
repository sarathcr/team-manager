import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
  @Input() imgUrl: string
  @Input() title: string
  @Input() editable = false
  @Input() userName: string
  @Output() fileSelect: EventEmitter<any> = new EventEmitter()
  constructor() {}
  ngOnInit(): void {
    this.getUserName()
  }
  getUserName(): void {
    const str = this.userName
    if (str.split(' ').length > 1) {
      const matches = str.match(/\b(\w)/g) // To split and get first letters of text
      this.userName = matches.join('') // To join the letters
    }
  }
  updateAvatar($event: any): void {
    this.fileSelect.emit($event)
  }
}
