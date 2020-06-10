import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextualHelpComponent implements OnInit {
  @Output() status = new EventEmitter<boolean>();
  closeContext: boolean = false;
  activeTab: any;

  constructor() { }

  ngOnInit(): void {
  }

  //Close tab 
  closeTab() {
    this.closeContext = false;
    this.status.emit(false);
    setTimeout(() => {
      this.activeTab.active = false;
    }, 500);
  }

  //Open tab
  openTab($event) {
    this.activeTab = $event;
    this.status.emit(true)
    if (!this.closeContext) {
      this.closeContext = true;
    }
  }
}
