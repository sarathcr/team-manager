import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { TabsetVariant } from '../../constants/model/tabset.model'

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss'],
})
export class TabsetComponent implements OnInit {
  @Input() tabs: string[]
  @Input() active = 0
  @Input() disabledTabs: number[] = []
  @Input() variant: TabsetVariant = 'material'
  @Output() activeTab: EventEmitter<any> = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  changeActiveTab(tabNumber: number): void {
    if (!this.disabledTabs.includes(tabNumber)) {
      this.active = tabNumber
      this.activeTab.emit(tabNumber)
    }
  }
}
