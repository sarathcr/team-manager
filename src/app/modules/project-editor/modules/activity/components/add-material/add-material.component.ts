import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  @Input() linkContent = ''
  @Input() url = ''
  @Input() linkStatus = 'default'
  @Output() declineModal = new EventEmitter()
  @Output() confirmModal = new EventEmitter()
  @Output() link = new EventEmitter()
  activeTab = 0
  currentView = 1
  addMaterialTabs = [
    'ADD_MATERIAL.material_add_new',
    'ADD_MATERIAL.material_add_link',
    'ADD_MATERIAL.material_add_device',
    'ADD_MATERIAL.material_add_googledrive'
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onDecline(event: string): void {
    this.declineModal.emit(event)
  }

  onConfirm(event: string): void {
    this.confirmModal.emit(event)
  }

  getActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber
  }

  changeView(variant: string): void {
    this.nextView()
  }

  previousView(): void {
    --this.currentView
  }

  nextView(): void {
    ++this.currentView
  }

  getLinkDetails(link: string): void {
    this.linkContent = 'loading'
    this.link.emit(link)
  }

}
