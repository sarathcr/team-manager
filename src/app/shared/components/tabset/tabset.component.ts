import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss']
})
export class TabsetComponent implements OnInit {
  @Input() tabs: string[]
  @Input() active = 0
  @Input() disabledTabs: number[] = []
  @Output() activeTab: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  changeActiveTab(tabNumber: number): void {
    if (!this.disabledTabs.includes(tabNumber)) {
      this.active = tabNumber
      this.activeTab.emit(tabNumber)
    }
  }
}
