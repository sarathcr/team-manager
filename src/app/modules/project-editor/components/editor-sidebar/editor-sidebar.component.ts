import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.scss']
})
export class EditorSidebarComponent {

  @Input() title: string
  @Input() view: string
  @Input() steps: any

  constructor() { }

}
