import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from './../../../../../../../assets/js/vfs_fonts.js'
import { backgrounds } from './../../../../../../../assets/js/backgrounds.js'
import { logos } from './../../../../../../../assets/js/logos.js'


import { PDFDocumentProxy } from 'ng2-pdf-viewer'
import { map } from 'rxjs/operators'

import { ProjectEntityService } from './../../../../store/entity/project/project-entity.service'

import { SubSink } from './../../../../../../shared/utility/subsink.utility'

pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  Museo: {
    normal: 'MuseoSansRounded700.otf',
    bold: 'MuseoSansRounded900.otf',
  },
  Brandon: {
    normal: 'Brandon_bld.otf',
    bold: 'Brandon_blk.otf',
  },
  PTSans: {
    normal: 'PTSans-Regular.ttf',
    bold: 'PTSans-Bold.ttf',
    italics: 'PTSans-Italic.ttf',
    bolditalics: 'PTSans-BoldItalic.ttf'
  }
}
@Component({
  selector: 'app-output-view',
  templateUrl: './output-view.component.html',
  styleUrls: ['./output-view.component.scss']
})
export class OutputViewComponent implements OnInit, OnDestroy {
  pdfSrc
  pdf: PDFDocumentProxy
  fileName = ''
  zoom = 0.98
  zoomMax = 2
  zoomMin = 0.5
  zoomAmt = 0.2
  zoomScale = 'page-width'
  totalPages = 0
  pageVariable = 1
  generatedPDF: any
  outline: any[]
  projectId: string
  projectData: any
  title: string
  subscription = new SubSink()
  documentDefinition
  pageWidth = 842
  pageHeight = 595
  loading = true
  @ViewChild('pdfViewer') pdfViewerContainer

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectEntityService
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')
    this.projectService.getByKey(this.projectId)
    this.subscription.sink = this.projectService.entities$.pipe(
      map(projects => projects.find(project => {
        return project.id === +(this.projectId)
      }))
    ).subscribe((data) => {
      if (data){
        this.projectData = data
        this.fileName = (this.projectData.creativeTitle ?  this.projectData.creativeTitle : this.projectData.title)
        this.title = this.fileName
        this.fileName = this.fileName + '.pdf'
        if (this.title){
          this.generatePDF()
          this.subjects()
        }
      }
    })
  }

  // PDF Generation
  async generatePDF(): Promise<any>{
    const bg = this.projectData.creativeImage ?
    await this.getBase64ImageFromURL(this.projectData.creativeImage) : null
    const thisRef = this
    this.documentDefinition = {
      info: {
        title: 'awesome Document',
        author: 'john doe',
        subject: 'subject of document',
        keywords: 'keywords for document'
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 40, 100, 40, 60 ],
      header(currentPage: number, pageCount: number, pageSize: any): any {
        if (currentPage === 1){
          return [
            {
              image: logos.logoWhite2x,
              fit: [70, 70],
              margin: [ 40, 30, 0, 0 ]
            }
          ]
        }else{
          return [{
            columns: [
              {
                image: logos.logo2x,
                fit: [50, 50],
                margin: [ 40, 30, 0, 0 ],
                alignment: 'left'
              },
              {
                text: thisRef.title,
                style: 'header'
              },
            ]
          }]
        }
      },
      footer(currentPage: number, pageCount: number): any {
        if (currentPage === 1){
          return {
            style: 'footer__cover',
            text: 'Col·legi Virolai ',
            margin: [40, 0, 0, 0]
          }
        }else if (currentPage === pageCount){
          return [{
            columns: [
              {
                style: 'footer',
                alignment: 'left',
                width: '50%',
                text: 'Creado con Thinko',
                margin: [40, 0, 0, 0]
              },
              {
                width: '*',
                alignment: 'right',
                margin: [0, 0, 40, 0],
                style: 'footer',
                text: [
                  'Sigue creando en ',
                  {
                    style: ['footer', 'footer_link'],
                    text: 'thinkoeducation.com',
                    link: 'https://thinkoeducation.com/',
                  }
                ]
              }
            ]
          }]
        }else{
          return [{
            columns: [
              {
                width: '*',
                text: ''
              },
              {
                alignment: 'right',
                margin: [0, 0, 40, 0],
                style: 'footer',
                text: currentPage,
                width: '50%',
              }
            ]
          }]
        }
      },
      content: [
        bg && {
          image: bg,
          width: 435,
          height: 435,
          absolutePosition: { x: 385, y: 105 }
        },
        {
          image: backgrounds.background,
          width: thisRef.pageWidth,
          height: thisRef.pageHeight,
          absolutePosition: { x: 0, y: 0 }
        },
        {
          tocItem: 'coverpage',
          stack: [
            {
              columns: [
                {
                  style: 'cover__title',
                  text: thisRef.title,
                  width: '50%',
                  tocItem: true,
                },
                {
                  width: '*',
                  text: ''
                }
              ]
            },
            thisRef.subjects(),
          ],
          absolutePosition: {x: 40, y: 210},
          pageBreak: 'after',
        },
        {
          text: 'A Main TOC header',
        },
        {
          text: 'Second toc header',
        },
        {
          text: 'Second toc header',
          tocItem: true,
          pageBreak: 'after',
          bold: true,
        },
      ],
      styles: {
        cover__title: {
          font: 'Museo',
          fontSize: 38,
          color: '#FFFFFF',
          bold: true,
        },
        cover__subtitle: {
          fontSize: 18,
          characterSpacing: 0.26,
          font: 'PTSans',
          color: '#FFFFFF'
        },
        header: {
          font: 'Museo',
          fontSize: 10,
          color: '#141C3A',
          opacity: 0.3,
          characterSpacing: 0.3,
          alignment: 'right',
          margin: [0, 30, 40, 0 ],
        },
        footer: {
          font: 'Museo',
          fontSize: 10,
          color: '#141C3A',
          opacity: 0.3,
          characterSpacing: 0.3
        },
        footer__cover: {
          fontSize: 10,
          color: '#FFFFFF',
          font: 'Museo',
          characterSpacing: 1.7,
          bold: true,
          alignment: 'left',
          margin: [ 40, 0, 0, 0 ]
        },
        footer_link: {
          decoration: 'underline',
          decorationColor: '#141C3A'
        }
      },
      defaultStyle: {
        font: 'PTSans',
        alignment: 'left',
        color: '#141C3A',
        fontSize: 10
      }
    }
    this.generatedPDF = pdfMake.createPdf(this.documentDefinition)
    this.generatedPDF.getBuffer((buffer) => {
      this.pdfSrc = buffer
    })
  }

  // PDF Viewer after event
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf
    this.loading = false
    this.totalPages = pdf.numPages
    const toc = this.generatedPDF.docDefinition.content.filter( content => content.toc)
    this.loadOutline(toc)
  }

  // Get Outlines from the PDF Viewer
  loadOutline(toc: any): void {
    const outlineTitles = [
      'PROGRAMACION.output_index_cover',
      'PROGRAMACION.output_index_overview',
      'PROGRAMACION.output_index_curriculum',
      'PROGRAMACION.output_index_objectives',
      'PROGRAMACION.output_index_standards',
      'PROGRAMACION.output_index_drivingquestions'
    ]
    this.pdf.getDestinations().then((outline: any[]) => {
      this.outline = Object.entries(outline).map( (item, index) => Object.assign(item, {title : outlineTitles[index]}))
    })
  }

  // Outline navigation functionality of the PDF Viewer
  navigateTo(destination: any): void {
    this.pdfViewerContainer.pdfLinkService.navigateTo(destination)
  }

  // Zoom functionality of the PDF Viewer
  setZoom(type: string): void {
    if (type === 'increment'){
      this.zoom += this.zoomAmt
    }else if (type === 'decrement'){
      this.zoom -= this.zoomAmt
    }
  }

  // Download functionality of the PDF
  download(): void{
    const blob = new Blob([this.pdfSrc], { type: 'application/pdf' })

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob)
      return
    }

    const data = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = data
    link.download = this.fileName
    link.click()

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => {
      window.URL.revokeObjectURL(data)
    }, 100)
  }

  // Print functionality of the PDF
  print(): void{
    // Remove previuosly added iframes
    const prevFrames = document.querySelectorAll('iframe[name="pdf-frame"]')
    if (prevFrames.length){
      prevFrames.forEach(item => item.remove())
    }

    // Constructing new iframe for the pdf print
    const blob = new Blob([this.pdfSrc], { type: 'application/pdf' })
    const objectURL = URL.createObjectURL(blob)
    const frame = document.createElement('iframe')
    frame.style.display = 'none'
    frame.src = objectURL
    document.body.appendChild(frame)
    frame.name = 'pdf-frame'
    frame.focus()

    // If Edge or IE
    if (this.isEdge() || this.isIE()) {
      frame.contentWindow.document.execCommand('print', false, null)
    } else {
      // Other browsers
      frame.contentWindow.print()
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  // Convert url image to base64
  getBase64ImageFromURL(url: string): any {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')
        resolve(dataURL)
      }
      img.onerror = error => {
        reject(error)
      }
      img.src = url
    })
  }

  //  check IE
  isIE(): boolean {
    return navigator.userAgent.indexOf('MSIE') !== -1
  }

  // check Edge
  isEdge(): boolean {
    return !this.isIE() && !!window.StyleMedia
  }

  // Render Subjects
  subjects(): object{
    const subjects = this.projectData.subjects?.map(item => item.name).join(', ')
    return {
      margin: [ 0, 10, 0, 0],
      columns: [
        {
          style: 'cover__subtitle',
          text: subjects,
          width: '50%',
        },
        {
          width: '*',
          text: ''
        }
      ]
    }
  }
}
