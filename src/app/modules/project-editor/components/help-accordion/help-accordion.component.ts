import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, ElementRef, Renderer2, HostListener } from '@angular/core'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

import { HelpModalContentComponent } from '../help-modal-content/help-modal-content.component'
import { Help } from '../../constants/model/project.model'

@Component({
  selector: 'app-help-accordion',
  templateUrl: './help-accordion.component.html',
  styleUrls: ['./help-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HelpAccordionComponent implements OnInit, OnDestroy {

  privateContent: Help[]
  @Input() set content(content: Help[]) {
    this.privateContent = content
    this.onContentChange()
  }
  get content(): Help[] { return this.privateContent }
  @Input() isOpen: boolean
  arrayHeight = ''
  oneAtATime = true
  isFirstOpen = true
  customClass = 'help-accordion'
  bsModalRef: BsModalRef
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustHeight()
  }

  constructor(
    private modalService: BsModalService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.adjustHeight()
  }

  ngOnDestroy(): void {
    const modalCount = this.modalService.getModalsCount()
    if (modalCount > 0) {
      this.modalService._hideModal(modalCount)
    }
  }
  onContentChange(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelectorAll('.help-img-thumb').forEach(thumb => {
        this.renderer.listen(thumb, 'click', (event) => { this.openModalWithComponent(event) })
      })
      this.elementRef.nativeElement.querySelectorAll('.help-video-thumb').forEach(thumb => {
        this.renderer.listen(thumb, 'click', (event) => { this.videoModal(event) })
      })
      this.elementRef.nativeElement.querySelectorAll('.help-pdf-thumb').forEach(thumb => {
        this.renderer.listen(thumb, 'click', (event) => { this.openPDF(event) })
      })
      this.adjustHeight()
    })
  }

  videoModal(event: any): void {
    event.preventDefault()
    const element = event.currentTarget
    const title = element.dataset.title
    const url = element.dataset.url
    const type = element.dataset.type
    const initialState = {
      title, // Title goes here
      video: true,
      videoSources: {
        src: url, // 'https://youtu.be/f4cstWWgOh0', // 'https://vimeo.com/347119375', // Set video url here
        type // this.type, //'video/youtube' 'video/vimeo' 'video/mp4' Set video type here
      }
    }

    this.bsModalRef = this.modalService.show(
      HelpModalContentComponent, { class: 'help-modal', initialState }
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  openModalWithComponent(event: any): void {
    event.preventDefault()
    const element = event.currentTarget
    const title = element.dataset.title
    const content = element.dataset.content
    const initialState = {
      title,
      img: content
    }

    this.bsModalRef = this.modalService.show(
      HelpModalContentComponent, { class: 'help-modal', initialState }
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  openPDF(event: any): void {
    event.preventDefault()
    const element = event.currentTarget
    const title = element.dataset.title
    const content = element.dataset.content
    const initialState = {
      title,
      pdf: true,
      pdfContent: content
    }

    this.bsModalRef = this.modalService.show(
      HelpModalContentComponent, { class: 'help-modal', initialState }
    )
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  adjustHeight(): void {
    this.arrayHeight = 'calc(100vh - ' + ((this.content.length * 60) + 160) + 'px)'
  }
}
