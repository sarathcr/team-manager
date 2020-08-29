import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-material-link',
  templateUrl: './material-link.component.html',
  styleUrls: ['./material-link.component.scss'],
})
export class MaterialLinkComponent implements OnInit {
  @Input() linkTitle: string
  @Input() status = 'default'
  @Input() link = ''
  @Input() thumbnail = ''
  @Input() linkContent = {
    image: '',
    type: '',
    url: '',
    title: ''
  }
  @Output() submitted = new EventEmitter()

  loading = false
  focus = false
  constructor() {}

  ngOnInit(): void {
    this.setFocus()
  }
  setFocus(): void {
    this.focus = true
  }

  handleKeyPress(event: any): void {
    const enterKey = 13
    if (event.keyCode === enterKey) {
      this.handleSubmit()
    }
  }

  handleSubmit(): void {
    this.submitted.emit(this.link)
  }

  changeStatus(): void {
    this.status = 'default'
  }

}
