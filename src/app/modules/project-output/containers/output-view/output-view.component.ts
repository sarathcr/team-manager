import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import pdfMake from 'pdfmake/build/pdfmake'
import { backgrounds } from './../../../../../assets/js/backgrounds.js'
import { logos } from './../../../../../assets/js/logos.js'
import pdfFonts from './../../../../../assets/js/vfs_fonts.js'

import { TranslateService } from '@ngx-translate/core'
import { PDFDocumentProxy } from 'ng2-pdf-viewer'

import { ProjectOutputService } from './../../services/output/project-output.service'

import { Step } from 'src/app/modules/project-editor/constants/model/project.model.js'
import { TableLayouts } from './../../config/tableLayouts'

import { SubSink } from './../../../../shared/utility/subsink.utility'
import { trimWhitespace } from './../../../../shared/utility/trim-whitespace.utility'

// PDFMAKE Fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  Museo: {
    normal: 'MuseoSansRounded700.otf',
    bold: 'MuseoSansRounded900.otf',
  },
  PTSans: {
    normal: 'PTSans-Regular.ttf',
    bold: 'PTSans-Bold.ttf',
    italics: 'PTSans-Italic.ttf',
    bolditalics: 'PTSans-BoldItalic.ttf',
  },
  Icomoon: {
    normal: 'icomoon.ttf',
  },
}

// PDFMAKE setting table layout
pdfMake.tableLayouts = TableLayouts
@Component({
  selector: 'app-output-view',
  templateUrl: './output-view.component.html',
  styleUrls: ['./output-view.component.scss'],
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
  academicYearTitle: string
  gradesTitle: string
  subjectsTitle: string
  themesTitle: string
  finalProductTitle: string
  drivingQuestionsTitle: string
  objectivesTitle: string
  standardsTitle: string
  objectivesSubTitle: string
  steps: Step[]
  subjectsInline: string
  errors = []
  @ViewChild('pdfViewer') pdfViewerContainer

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private outputService: ProjectOutputService
  ) {}

  ngOnInit(): void {
    this.getLocalizations()
    this.projectId = this.route.snapshot.paramMap.get('id')
    this.getStepStatus()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  // project data
  getProjectData(): void {
    this.subscription.sink = this.outputService
      .getProjectData(this.projectId)
      .pipe(
        catchError((err) => {
          this.errors.push(err.error)
          return throwError(err)
        })
      )
      .subscribe((data) => {
        if (data) {
          this.projectData = data
          this.fileName =
            this.isStepDone(6) && this.projectData.creativeTitle
              ? this.projectData.creativeTitle
              : this.projectData.title
          this.title = this.fileName
          this.fileName = this.fileName + '.pdf'
          if (this.title) {
            this.generatePDF()
          }
        }
      })
  }

  // step status
  getStepStatus(): void {
    this.outputService
      .getStepStatus(this.projectId)
      .pipe(
        catchError((err) => {
          this.errors.push(err.error)
          return throwError(err)
        })
      )
      .subscribe((data) => {
        this.steps = data?.steps
        this.getProjectData()
      })
  }

  isStepDone(stepId: number): boolean {
    const stepData = this.steps?.find((step) => step.stepid === stepId)
    if (stepData && stepData.state === 'DONE') {
      return true
    }
    return false
  }

  // PDF Generation
  async generatePDF(): Promise<any> {
    this.subjects()
    const creativeImage =
      this.isStepDone(6) && this.projectData.creativeImage
        ? await this.getBase64ImageFromURL(this.projectData.creativeImage)
        : null
    const thisRef = this
    this.documentDefinition = {
      info: {
        title: this.title,
        author: 'Thinko',
        subject: 'Project Details',
        keywords: 'project',
        creator: 'Thinko',
        creationDate: new Date(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
      header(currentPage: number, pageCount: number, pageSize: any): any {
        if (currentPage === 1) {
          return [
            {
              image: logos.logoWhite2x,
              fit: [70, 70],
              margin: [40, 30, 0, 0],
            },
          ]
        } else {
          return [
            {
              columns: [
                {
                  image: logos.logo2x,
                  fit: [50, 50],
                  margin: [40, 30, 0, 0],
                  alignment: 'left',
                },
                {
                  text: thisRef.title,
                  style: 'header',
                },
              ],
            },
          ]
        }
      },
      footer(currentPage: number, pageCount: number): any {
        if (currentPage === 1) {
          return {
            style: 'footer__cover',
            text: 'Col·legi Virolai ',
            margin: [40, 10, 0, 0],
          }
        } else if (currentPage === pageCount) {
          return [
            {
              columns: [
                {
                  style: 'footer',
                  alignment: 'left',
                  width: '50%',
                  text: 'Creado con Thinko',
                  margin: [40, 10, 0, 0],
                },
                {
                  width: '*',
                  alignment: 'right',
                  margin: [0, 10, 40, 0],
                  style: 'footer',
                  text: [
                    'Sigue creando en ',
                    {
                      style: ['footer', 'footer_link'],
                      text: 'thinkoeducation.com',
                      link: 'https://thinkoeducation.com/',
                    },
                  ],
                },
              ],
            },
          ]
        } else {
          return [
            {
              columns: [
                {
                  width: '*',
                  text: '',
                },
                {
                  alignment: 'right',
                  margin: [0, 10, 40, 0],
                  style: 'footer',
                  text: currentPage,
                  width: '50%',
                },
              ],
            },
          ]
        }
      },
      content: [
        creativeImage && {
          image: creativeImage,
          width: 435,
          height: 435,
          absolutePosition: { x: 385, y: 105 },
        },
        this.coverBackgroundLayer(),
        this.coverTextLayer(),
        this.overview(),
        this.objectives(),
        this.driving(),
      ],
      pageBreakBefore(currentNode: any): boolean {
        if (
          currentNode.id === 'driving' &&
          currentNode.startPosition.top >
            currentNode.startPosition.pageInnerHeight
        ) {
          return true
        }
        if (
          currentNode.id === 'subjects' &&
          currentNode.startPosition.top >
            currentNode.startPosition.pageInnerHeight
        ) {
          return true
        }
        if (
          currentNode.id === 'objectives' &&
          currentNode.startPosition.top >
            currentNode.startPosition.pageInnerHeight
        ) {
          return true
        }
      },
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
          color: '#FFFFFF',
        },
        header: {
          font: 'Museo',
          fontSize: 10,
          color: '#141C3A',
          opacity: 0.3,
          characterSpacing: 0.3,
          alignment: 'right',
          margin: [0, 30, 40, 0],
        },
        footer: {
          font: 'Museo',
          fontSize: 10,
          color: '#141C3A',
          opacity: 0.3,
          characterSpacing: 0.3,
        },
        footer__cover: {
          fontSize: 10,
          color: '#FFFFFF',
          font: 'Museo',
          characterSpacing: 1.7,
          bold: true,
          alignment: 'left',
          margin: [40, 0, 0, 0],
        },
        footer_link: {
          decoration: 'underline',
          decorationColor: '#141C3A',
        },
        overview__title: {
          font: 'Museo',
          fontSize: 24,
          characterSpacing: 0.19,
          margin: [0, 0, 0, 10],
          bold: true,
        },
        overview__description: {
          font: 'PTSans',
          fontSize: 12,
          characterSpacing: 0.2,
          margin: [0, 0, 0, 20],
          lineHeight: 1.25,
        },
        overview__subTitle: {
          font: 'Museo',
          fontSize: 12,
          lineHeight: 0.5,
          characterSpacing: 0,
          margin: [0, 0, 0, 15],
        },
        overview__data: {
          fillColor: '#FAFBFB',
          margin: [15, 10, 15, 10],
          fontSize: 12,
          font: 'PTSans',
          characterSpacing: 0.3,
        },
        overview__tableContent: {
          margin: [0, 10, 0, 10],
          lineHeight: 1.25,
        },
        tableHeader: {
          alignment: 'center',
          color: '#FFFFFF',
          fontSize: 12,
          font: 'Museo',
          bold: true,
          characterSpacing: 0.36,
        },
        tableHeaderSmall: {
          fontSize: 10,
          font: 'PTSans',
          bold: false,
          margin: [0, 15],
          characterSpacing: 0.5,
        },
        icon: {
          font: 'Icomoon',
          fontSize: 12,
          color: '#141C3A',
          margin: [0, 0, 5, 0],
        },
        tableIcon: {
          margin: [0, 0, 0, 15],
        },
        orderedList: {
          bold: true,
          margin: [0, 0, 5, 0],
          lineHeight: 1.4,
        },
        bulletList: {
          bold: false,
          margin: [0, 0, 0, 5],
          lineHeight: 1.4,
          font: 'PTSans',
        },
      },
      defaultStyle: {
        font: 'PTSans',
        alignment: 'left',
        color: '#141C3A',
        fontSize: 10,
      },
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
    const toc = this.generatedPDF.docDefinition.content.filter(
      (content) => content.toc
    )
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
      'PROGRAMACION.output_index_drivingquestions',
    ]
    this.pdf.getDestinations().then((outline: any[]) => {
      this.outline = Object.entries(outline).map((item, index) =>
        Object.assign(item, { title: outlineTitles[index] })
      )
    })
  }

  // Outline navigation functionality of the PDF Viewer
  navigateTo(destination: any): void {
    this.pdfViewerContainer.pdfLinkService.navigateTo(destination)
  }

  // Zoom functionality of the PDF Viewer
  setZoom(type: string): void {
    if (type === 'increment') {
      this.zoom += this.zoomAmt
    } else if (type === 'decrement') {
      this.zoom -= this.zoomAmt
    }
  }

  // Download functionality of the PDF
  download(): void {
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
  print(): void {
    // Remove previuosly added iframes
    const prevFrames = document.querySelectorAll('iframe[name="pdf-frame"]')
    if (prevFrames.length) {
      prevFrames.forEach((item) => item.remove())
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
      img.onerror = (error) => {
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

  // PDF Document render cover background layer
  coverBackgroundLayer(): object {
    return {
      image: backgrounds.background,
      width: this.pageWidth,
      height: this.pageHeight,
      absolutePosition: { x: 0, y: 0 },
    }
  }

  // PDF Document render cover Text layer
  coverTextLayer(): object {
    return {
      id: 'cover',
      tocItem: true,
      stack: [
        {
          columns: [
            {
              style: 'cover__title',
              text: this.title,
              width: '45%',
            },
            {
              width: '*',
              text: '',
            },
          ],
        },
        {
          margin: [0, 10, 0, 0],
          columns: [
            {
              style: 'cover__subtitle',
              text: this.subjectsInline,
              width: '45%',
            },
            {
              width: '*',
              text: '',
            },
          ],
        },
      ],
      absolutePosition: { x: 40, y: 210 },
      pageBreak: 'after',
    }
  }

  // PDF Document get subjects data inline
  subjects(): void {
    this.subjectsInline = this.projectData.subjects
      ?.map((item) => item.name)
      .join(', ')
  }

  // PDF Document render overview data
  overview(): object {
    return {
      id: 'overview',
      tocItem: true,
      columns: [
        {
          width: '50%',
          margin: [0, 0, 20, 0],
          stack: [
            {
              style: 'overview__title',
              text: this.title,
            },
            {
              style: 'overview__description',
              text:
                this.isStepDone(9) && this.projectData.synopsis
                  ? this.projectData.synopsis
                  : '',
            },
            {
              style: 'overview__subTitle',
              text: this.academicYearTitle,
            },
            {
              layout: 'noBorders',
              margin: [0, 0, 0, 20],
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      style: 'overview__data',
                      text: this.projectData.academicYear.academicYear,
                    },
                  ],
                ],
              },
            },
            { style: 'overview__subTitle', text: this.gradesTitle },
            {
              layout: 'noBorders',
              margin: [0, 0, 0, 20],
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      style: 'overview__data',
                      text: this.projectData.grades
                        .map((grade) => grade.name)
                        .join(', '),
                    },
                  ],
                ],
              },
            },
            {
              stack: [
                {
                  id: 'subjects',
                  style: 'overview__subTitle',
                  text: this.subjectsTitle,
                },
                {
                  layout: 'noBorders',
                  margin: [0, 0, 0, 20],
                  table: {
                    widths: ['*'],
                    body: [
                      [
                        {
                          style: 'overview__data',
                          text: this.subjectsInline,
                        },
                      ],
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          margin: [20, 8, 0, 0],
          stack: [this.themes(), this.finalProduct()],
        },
      ],
    }
  }

  // PDF Document render Driving Questions
  driving(): object {
    const questionList = this.projectData?.drivingQuestions
    if (this.isStepDone(7) && questionList?.length) {
      const tableHeader = [
        {
          text: this.drivingQuestionsTitle.toUpperCase(),
          style: 'tableHeader',
        },
      ]
      const tableBody = []
      tableBody.push(tableHeader)
      questionList.forEach((item) => {
        const dataRow = []
        tableHeader.forEach(() => {
          dataRow.push([this.getList(item.name)])
        })
        tableBody.push(dataRow)
      })
      return {
        id: 'driving',
        tocItem: true,
        margin: [0, 20, 0, 0],
        table: {
          widths: ['*'],
          body: tableBody,
        },
        layout: 'defaultLayout',
      }
    }
  }

  // PDF Document render Themes
  themes(): object {
    const themesList = this.projectData?.themes
    const tableHeader = [
      {
        text: this.themesTitle.toUpperCase(),
        style: 'tableHeader',
      },
    ]
    const tableBody = []
    tableBody.push(tableHeader)
    if (this.isStepDone(2) && themesList?.length) {
      themesList.forEach((item) => {
        const dataRow = []
        tableHeader.forEach(() => {
          dataRow.push([this.getList(item.name)])
        })
        tableBody.push(dataRow)
      })
    } else {
      tableBody.push([
        {
          text: [''],
          margin: [0, 0, 0, 5],
        },
      ])
    }
    return {
      margin: [0, 0, 0, 20],
      table: {
        widths: ['*'],
        body: tableBody,
      },
      layout: 'secondaryLayout',
    }
  }

  // PDF Document render Final product
  finalProduct(): object {
    return {
      margin: [0, 0, 0, 20],
      table: {
        widths: ['*'],
        body: [
          [
            {
              text: this.finalProductTitle.toUpperCase(),
              style: 'tableHeader',
            },
          ],
          [
            {
              text:
                this.isStepDone(8) && this.projectData.finalProduct
                  ? trimWhitespace(this.projectData.finalProduct)
                  : '',
              lineHeight: 1.25,
            },
          ],
        ],
      },
      layout: 'secondaryLayout',
    }
  }

  // Objectives and standards
  objectives(): object {
    const objectives = this.projectData.competencyObjectives
    const tableBody = []
    if (this.isStepDone(5) && objectives?.length) {
      const tableHeader = [
        {
          text: [
            {
              text: this.objectivesTitle.toUpperCase() + '\n',
            },
            {
              text: this.objectivesSubTitle,
              style: 'tableHeaderSmall',
            },
          ],
          style: 'tableHeader',
        },
        {
          text: [
            {
              text: this.standardsTitle.toUpperCase(),
            },
          ],
          margin: [0, 6],
          style: 'tableHeader',
        },
      ]
      tableBody.push(tableHeader)
      objectives.forEach((item, row) => {
        const allStandards = item.standards.concat(item.customStandards)
        const standards = allStandards.map((standard) => {
          return this.getList(standard.name, 'bulletList')
        })
        const dataRow = []
        tableHeader.forEach((heading, column) => {
          if (column === 0) {
            dataRow.push([
              {
                columns: [
                  {
                    width: 'auto',
                    text: row + 1 + '.',
                    style: 'orderedList',
                  },
                  {
                    width: '*',
                    text: trimWhitespace(item.name),
                  },
                ],
              },
            ])
          }
          if (column === 1) {
            standards.forEach(() => {})
            dataRow.push([standards])
          }
        })
        tableBody.push(dataRow)
      })
    }
    if (tableBody.length) {
      return {
        id: 'objectives',
        margin: [0, 10, 0, 10],
        table: {
          dontBreakRows: true,
          widths: ['50%', '50%'],
          body: tableBody,
        },
        layout: 'defaultLayout',
      }
    } else {
      return {
        text: '',
      }
    }
  }

  // Funtion for getting localizations
  getLocalizations(): void {
    this.translateService
      .stream([
        'PROGRAMACION.project_startingpoint_year',
        'PROGRAMACION.project_startingpoint_grades',
        'PROGRAMACION.project_startingpoint_subjects',
        'PROGRAMACION.project_structure_stepsmenu_topic',
        'PROGRAMACION.project_structure_stepsmenu_finalproduct',
        'PROGRAMACION.project_stepsmenu_drivingquestion',
        'PROGRAMACION.project_structure_stepsmenu_objectives',
        'PROGRAMACION.project_structure_stepsmenu_standards',
        'PROGRAMACION.output_objectives_subtitle',
      ])
      .subscribe((translations) => {
        this.academicYearTitle =
          translations['PROGRAMACION.project_startingpoint_year']
        this.gradesTitle =
          translations['PROGRAMACION.project_startingpoint_grades']
        this.subjectsTitle =
          translations['PROGRAMACION.project_startingpoint_subjects']
        this.themesTitle =
          translations['PROGRAMACION.project_structure_stepsmenu_topic']
        this.finalProductTitle =
          translations['PROGRAMACION.project_structure_stepsmenu_finalproduct']
        this.drivingQuestionsTitle =
          translations['PROGRAMACION.project_stepsmenu_drivingquestion']
        this.objectivesTitle =
          translations['PROGRAMACION.project_structure_stepsmenu_objectives']
        this.standardsTitle =
          translations['PROGRAMACION.project_structure_stepsmenu_standards']
        this.objectivesSubTitle =
          translations['PROGRAMACION.output_objectives_subtitle']
      })
  }

  getList(item: string, styleName: string = ''): object {
    return {
      ul: [
        {
          text: trimWhitespace(item),
          style: styleName,
        },
      ],
    }
  }
}
