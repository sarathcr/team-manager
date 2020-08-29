import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() outline: any[]
  @Input() title = 'PROGRAMACION.output_index_title'
  @Output() navigateTo: EventEmitter<any> = new EventEmitter()
  linkId = 0
  constructor() {}

  ngOnInit(): void {}

  anchorClick(linkId: number, rout: any): void {
    this.linkId = linkId
    this.navigateTo.emit(rout)
  }
}
