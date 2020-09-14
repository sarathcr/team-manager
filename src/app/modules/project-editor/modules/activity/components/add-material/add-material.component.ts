import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { PDFDocumentProxy } from 'pdfjs-dist'
import { StatusMaterial } from 'src/app/modules/project-editor/constants/model/activity.model'

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnDestroy {
  @Input() referenceMaterial: StatusMaterial = {
    status: 'default',
    fileType: 'DOCUMENT',
    previewImageUrl: '',
    sourceType: 'GOOGLEDRIVE',
    title: '',
    url: '',
    visible: true,
    callConfirm: false
  }
  @Input() activeMaterialTab = 0
  @Input() currentMaterialView = 1
  @Output() declineModal = new EventEmitter()
  @Output() confirmModal = new EventEmitter()
  @Output() setActiveTab = new EventEmitter()
  @Output() nextMaterialView = new EventEmitter()
  @Output() previousMaterialView = new EventEmitter()
  @Output() setModalDetails = new EventEmitter()
  @Output() resetTabs = new EventEmitter()
  addMaterialTabs = [
    'ADD_MATERIAL.material_add_new',
    'ADD_MATERIAL.material_add_link',
    'ADD_MATERIAL.material_add_device',
    'ADD_MATERIAL.material_add_googledrive',
  ]
  pdfSrc = './../../../../../assets/images/step1_ac_000032_ver.pdf'
  pdf: PDFDocumentProxy
  fileName = ''
  zoom = 0.98
  zoomMax = 2
  zoomMin = 0.5
  zoomAmt = 0.2
  zoomScale = 'page-width'
  totalPages = 0
  pageVariable = 1

  constructor() {}

  ngOnDestroy(): void {
    this.resetTabs.emit()
  }

  onDecline(event: string): void {
    this.declineModal.emit(event)
  }

  onConfirm(): void {
    this.confirmModal.emit(this.referenceMaterial)
  }

  getActiveTab(tabNumber: number): void {
    this.setActiveTab.emit(tabNumber)
  }

  changeView(variant: string): void {
    this.nextModal()
  }

  previousModal(): void {
    this.previousMaterialView.emit()
  }

  nextModal(): void {
    this.nextMaterialView.emit()
  }

  getMaterialDetails(referenceMaterial: StatusMaterial, callConfirm?: boolean): void {
    this.setModalDetails.emit({ ...referenceMaterial, callConfirm })
  }
}
