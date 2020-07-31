import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() outline: any[]
  @Output() navigateTo: EventEmitter<any> = new EventEmitter()
  linkId = 0
  constructor() { }

  ngOnInit(): void {}

  anchorClick(linkId: number, rout: any): void{
    this.linkId = linkId
    this.navigateTo.emit(rout)
  }
}
