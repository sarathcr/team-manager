import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, forkJoin, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import pdfMake from 'pdfmake/build/pdfmake'
import { backgrounds } from './../../../../../assets/js/backgrounds.js'
import { logos } from './../../../../../assets/js/logos.js'
import pdfFonts from './../../../../../assets/js/vfs_fonts.js'

import { TranslateService } from '@ngx-translate/core'
import { PDFDocumentProxy } from 'ng2-pdf-viewer'

import { ProjectOutputService } from './../../services/output/project-output.service'

import { Step } from 'src/app/modules/project-editor/constants/model/project.model.js'

import { defaultStyle, styles } from './../../config/pdfCustomStyles'
import { fonts } from './../../config/pdfFonts'

import { TableLayouts } from '../../config/pdfTableLayouts'

import { SubSink } from './../../../../shared/utility/subsink.utility'
import { trimWhitespace } from './../../../../shared/utility/trim-whitespace.utility'

// PDFMAKE Fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = fonts

// PDFMAKE setting table layout
pdfMake.tableLayouts = TableLayouts
@Component({
  selector: 'app-output-view',
  templateUrl: './output-view.component.html',
  styleUrls: ['./output-view.component.scss'],
})
export class OutputViewComponent implements OnInit, OnDestroy {
  // PDF Options Variables
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
  pageWidth = 842
  pageHeight = 595

  // Project Variables
  projectId: string
  projectData: any
  title: string
  subscription = new SubSink()
  documentDefinition: object
  curriculumId: string
  shortCodes: any
  steps: Step[]
  loading = true
  subjectEvaluation: any[] = []
  subjectsInline: string
  curriculumRelation: string
  rowIndex = 0
  subjectWiseDimension = []
  allCriterias: any[] = []
  projectImage: any
  projectBackground: object
  projectCoverText: object
  projectOverview: object
  projectObjectiveStandards: object
  projectDrivingQns: object
  projectEvaluationCriteria: object
  projectCompetencyRelation: object
  projectShortCodeDesc: object

  // Localisation title Variables
  academicYearTitle: string
  gradesTitle: string
  subjectsTitle: string
  themesTitle: string
  finalProductTitle: string
  drivingQuestionsTitle: string
  objectivesTitle: string
  standardsTitle: string
  objectivesSubTitle: string
  evaluationSubtitle: string
  contentSubtitle: string
  customContentSubtitle: string
  competenciasSubtitle: string
  footerCompetencias: string
  footerDimension: string

  // Other Variables
  errors = []
  criteriaPageNumber: number

  @ViewChild('pdfViewer') pdfViewerContainer

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private outputService: ProjectOutputService
  ) {}

  ngOnInit(): void {
    this.getLocalizations()
    this.projectId = this.route.snapshot.paramMap.get('id')
    combineLatest([
      this.outputService.getProjectData(this.projectId),
      this.outputService.getStepStatus(this.projectId),
    ])
      .pipe(
        catchError((err) => {
          this.errors.push(err.error)
          return throwError(err)
        })
      )
      .subscribe(([project, step]) => {
        if (project && step) {
          this.projectData = project
          this.steps = step.steps
          this.curriculumId = this.projectData.curriculumId
          this.fileName =
            this.isStepDone(6) && this.projectData.creativeTitle
              ? this.projectData.creativeTitle
              : this.projectData.title
          this.title = this.fileName
          this.fileName = this.fileName + '.pdf'
          if (this.title) {
            this.getCodesAndEvaluationCriterias()
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  // Get short codes of the Dimensions or basic skills based on the Curriculum ID
  getCodesAndEvaluationCriterias(): void {
    console.log('getCodesAndEvaluationCriterias()')
    if (this.projectData.subjects.length) {
      const evalIds = []
      this.projectData.subjects.map((item) => {
        const ids = item.evaluationCriteria.map(({ id }) => id)
        evalIds.push(...ids)
      })
      if (evalIds.length) {
        this.callAPICodesAndEvaluation(evalIds)
          .then(() => this.arrayCreation())
          .then(() => this.extractSubjectWiseDimension())
      } else {
        this.arrayCreation().then(() => this.contents())
      }
    }
  }

  callAPICodesAndEvaluation(evalIds: Array<number>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      combineLatest([
        this.outputService.getCodes(this.curriculumId),
        this.outputService.getCrtieriasDetails(evalIds),
      ])
        .pipe(
          catchError((err) => {
            this.errors.push(err.error)
            return throwError(err)
          })
        )
        .subscribe(([codes, criterias]) => {
          if (codes) {
            this.shortCodes = codes
          }
          if (criterias) {
            this.allCriterias = criterias
          }
          resolve()
        })
    })
  }

  arrayCreation(): Promise<any> {
    console.log('arrayCreation()')
    return new Promise(async (resolve, reject) => {
      if (this.projectData.subjects.length) {
        await Promise.all(
          this.projectData.subjects.map(
            async ({
              id: subjectID,
              name,
              evaluationCriteria,
              customContents,
              contents,
            }) => {
              const subjectWiseIds = evaluationCriteria.map(({ id }) => id)
              const evaluation = this.allCriterias.filter((item) =>
                subjectWiseIds.includes(item.id)
              )
              let relation = ''
              this.subjectWiseDimension = []
              evaluation.forEach(({ basicSkills, dimensions }) => {
                if (basicSkills.length) {
                  relation = 'basic-skill'
                } else if (dimensions.length) {
                  relation = 'dimension'
                } else {
                  relation = 'no-relation'
                }
              })
              if (relation === 'dimension') {
                this.subjectWiseDimension.push(
                  this.outputService.getSubjectWiseDimension(subjectID)
                )
              }
              this.curriculumRelation = relation
              const groupedData = []
              const groupedContent = this.groupBy(contents, 'blockid')
              const groupedEvaluation = this.groupBy(evaluation, 'blockId')
              for (const key of Object.keys(groupedEvaluation)) {
                groupedData.push({
                  blockID: key,
                  evaluationData: groupedEvaluation[key],
                  contentData: groupedContent[key] ? groupedContent[key] : [],
                })
              }
              this.subjectEvaluation.push({
                subjectID,
                subjectName: name,
                customContents,
                evaluationCriteria: groupedData,
                subjectRelation: relation,
                subjectDimensions: this.subjectWiseDimension,
              })
            }
          )
        )
        resolve()
      } else {
        resolve()
      }
    })
  }

  extractSubjectWiseDimension(): void {
    Promise.all(
      this.subjectEvaluation.map(
        ({ subjectID, subjectRelation, subjectDimensions }) => {
          this.subjectWiseDimension = []
          return new Promise((resolve, reject) => {
            if (subjectRelation === 'dimension' && subjectDimensions.length) {
              forkJoin(subjectDimensions)
                .pipe(
                  catchError((err) => {
                    this.errors.push(err.error)
                    return throwError(err)
                  })
                )
                .subscribe((data) => {
                  if (data) {
                    this.subjectWiseDimension.push({
                      id: subjectID,
                      dimensions: data[0],
                    })
                    resolve(this.subjectWiseDimension)
                  }
                })
            } else {
              resolve()
            }
          })
        }
      )
    ).then(() => this.contents())
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
    console.log('Started generating PDF')
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
        this.projectImage,
        this.projectBackground,
        this.projectCoverText,
        this.projectOverview,
        this.projectEvaluationCriteria && {
          id: 'evaluationCriteria',
          pageBreak: 'before',
          tocItem: true,
          stack: [this.projectEvaluationCriteria],
        },
        this.projectCompetencyRelation,
        this.projectObjectiveStandards,
        this.projectDrivingQns,
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
        console.log(currentNode)
        if (currentNode.id === 'evaluationCriteria') {
          console.log(currentNode)
        }
      },
      styles,
      defaultStyle,
    }
    this.generatedPDF = pdfMake.createPdf(this.documentDefinition)
    this.generatedPDF.getBuffer((buffer) => {
      this.pdfSrc = buffer
    })
  }

  // Contents for the PDF
  contents(): void {
    console.log('contents()')
    this.coverPage()
      .then(() => this.overview())
      .then(() => this.evaluationCriteria())
      .then(() => this.competencyRelation())
      .then(() => this.objectives())
      .then(() => this.driving())
      .then(() => {
        console.log('completed data preparation')
        this.generatePDF()
      })
  }

  // Build Cover page
  coverPage(): Promise<any> {
    console.log('Build Cover Page : coverPage()')
    return new Promise(async (resolve, reject) => {
      this.subjectsInline = this.projectData.subjects
        ?.map((item) => item.name)
        .join(', ')
      if (this.isStepDone(6)) {
        await this.getBase64ImageFromURL(this.projectData.creativeImage).then(
          (data) => {
            this.projectImage = {
              image: data,
              width: 435,
              height: 435,
              absolutePosition: { x: 385, y: 105 },
            }
          }
        )
      } else {
        this.projectImage = null
      }
      this.projectBackground = {
        image: backgrounds.background,
        width: this.pageWidth,
        height: this.pageHeight,
        absolutePosition: { x: 0, y: 0 },
      }
      this.projectCoverText = {
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
      resolve()
    })
  }
  // PDF Viewer after event
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf
    this.loading = false
    this.totalPages = pdf.numPages
    const toc = this.generatedPDF.docDefinition.content.filter((content) => {
      return content.tocItem
    })
    this.loadOutline(toc)
  }

  // Get Outlines from the PDF Viewer
  loadOutline(toc: any): void {
    this.outline = []
    toc.map((item) => {
      this.outline.push({
        id: item.id,
        title: this.chooseOutlineTitle(item.id),
        pageNumber: item.positions[0].pageNumber,
        lastPageNumber:
          item.nodeInfo.pageNumbers[item.nodeInfo.pageNumbers.length - 1],
      })
      if (item.id === 'objectives') {
        this.outline.push({
          id: 'standards',
          title: this.chooseOutlineTitle('standards'),
          pageNumber: item.positions[0].pageNumber,
          lastPageNumber:
            item.nodeInfo.pageNumbers[item.nodeInfo.pageNumbers.length - 1],
        })
      }
    })
  }

  chooseOutlineTitle(id: string): string {
    let title = ''
    switch (id) {
      case 'cover':
        title = 'PROGRAMACION.output_index_cover'
        break
      case 'overview':
        title = 'PROGRAMACION.output_index_overview'
        break
      case 'evaluationCriteria':
        title = 'PROGRAMACION.output_index_curriculum'
        break
      case 'objectives':
        title = 'PROGRAMACION.output_index_objectives'
        break
      case 'standards':
        title = 'PROGRAMACION.output_index_standards'
        break
      case 'driving':
        title = 'PROGRAMACION.output_index_drivingquestions'
        break
    }
    return title
  }

  // Scroll to the page
  scrollToPage(page: number): void {
    this.pdfViewerContainer.pdfViewer.scrollPageIntoView({
      pageNumber: page,
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

  // PDF Document get subjects data inline
  subjects(): void {
    this.subjectsInline = this.projectData.subjects
      ?.map((item) => item.name)
      .join(', ')
  }

  // Build Overview
  overview(): Promise<any> {
    console.log('Build Overview : overview()')
    return new Promise(async (resolve, reject) => {
      this.projectOverview = {
        id: 'overview',
        tocItem: true,
        // pageBreak: 'after',
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
      console.log('finsihed overview')
      resolve()
    })
  }

  // Build Evaluation Criteria and Contents
  evaluationCriteria(): Promise<any> {
    console.log('Build Evaluation criteria: evaluationCriteria()')
    return new Promise(async (resolve, reject) => {
      if (this.isStepDone(3) && this.isStepDone(4)) {
        this.projectEvaluationCriteria = await Promise.all(
          this.subjectEvaluation.map(
            (
              {
                subjectID,
                subjectName,
                subjectRelation,
                evaluationCriteria,
                customContents,
              },
              index
            ) => {
              if (subjectRelation === 'basic-skill') {
                return this.evaluationBasicSkill(
                  subjectName,
                  evaluationCriteria,
                  customContents,
                  index
                )
              } else if (subjectRelation === 'dimension') {
                return this.evaluationDimension(
                  subjectID,
                  subjectName,
                  evaluationCriteria,
                  customContents,
                  index
                )
              } else if (subjectRelation === 'no-relation') {
                return this.evaluationNoRelation(
                  subjectName,
                  evaluationCriteria,
                  customContents,
                  index
                )
              }
            }
          )
        )
        resolve(this.projectEvaluationCriteria)
      } else {
        resolve()
      }
    })
  }

  evaluationBasicSkill(
    subjectName: string,
    evaluationCriteria: any,
    customContents: any,
    index: number
  ): object {
    const basicSkillCodes = this.shortCodes.basicSkillCodes.sort((a, b) => {
      return a.id - b.id
    })
    this.curriculumRelation = 'basic-skill'
    const tableHeader = [
      {
        text: this.evaluationSubtitle,
        style: 'subjectSubHeader',
      },
      {
        text: this.contentSubtitle,
        style: 'subjectSubHeader',
      },
    ]
    const widths = []
    for (const item of basicSkillCodes) {
      tableHeader.push({
        text: item.code,
        style: 'subjectSubHeaderCenter',
      })
      widths.push(30)
    }
    const tableBody = []
    tableBody.push(tableHeader)
    if (evaluationCriteria.length) {
      evaluationCriteria.forEach((group) => {
        const evalNames = []
        const contentsData = []
        let basicSkillData = []
        group.evaluationData.forEach((item) => {
          this.rowIndex++
          basicSkillData.push(...item.basicSkills)
          evalNames.push({
            columns: [
              {
                width: 'auto',
                text: this.rowIndex + '.',
                style: ['orderedList', 'contentText'],
              },
              {
                width: '*',
                text: trimWhitespace(item.name),
                style: ['contentText'],
              },
            ],
            margin: [-10, 0, 0, 0],
          })
        })
        if (group.contentData?.length) {
          group.contentData.forEach((entity) => {
            contentsData.push({ text: entity.name })
          })
        }
        // Get distinct basic skills
        basicSkillData = [...new Set(basicSkillData.map((items) => items.code))]
        const markedBasicSkill = []
        basicSkillCodes.forEach((item) => {
          if (basicSkillData.includes(item.code)) {
            markedBasicSkill.push({
              text: '.',
              style: ['icon', 'mark'],
            })
          } else {
            markedBasicSkill.push({
              text: '',
            })
          }
        })
        tableBody.push([
          {
            type: 'none',
            ul: evalNames,
            style: ['contentText'],
          },
          {
            ul: contentsData,
            style: ['contentText'],
          },
          ...markedBasicSkill,
        ])
      })
    }
    if (customContents?.length) {
      tableBody.push([
        {
          text: this.customContentSubtitle,
          fillColor: '#fff',
          style: 'subjectSubHeader',
          colSpan: tableHeader.length,
        },
      ])
      customContents.map((item) => {
        tableBody.push([
          {
            ul: [
              {
                text: item.name,
                style: ['contentText'],
              },
            ],
            colSpan: tableHeader.length,
          },
        ])
      })
    }
    const basicSkillDesc = []
    basicSkillDesc.push({
      text: this.footerCompetencias + '.',
      style: 'shortCode',
    })
    basicSkillCodes.forEach((item, i, array) => {
      basicSkillDesc.push(
        { text: ' ' + item.code + ': ', style: 'shortCode' },
        {
          text: item.name + (i === array.length - 1 ? ' ' : ','),
          style: 'shortCodeDesc',
        }
      )
    })
    return {
      id: 'subjectTableStart' + index,
      tocItem: true,
      // unbreakable: true,
      stack: [
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: subjectName.toUpperCase(), style: ['subjectHeader'] }],
            ],
          },
          layout: 'headerLayout',
        },
        {
          id: subjectName + '-criteriaStart',
          table: {
            widths: ['*', '*', ...widths],
            headerRows: 1,
            // keepWithHeaderRows: 1,
            // dontBreakRows: true,
            body: tableBody,
          },
          layout: 'tertiaryLayout',
        },
        {
          text: basicSkillDesc,
          margin: [0, 10, 0, 15],
        },
      ],
    }
  }

  evaluationDimension(
    subjectID: number,
    subjectName: string,
    evaluationCriteria: any,
    customContents: any,
    index: number
  ): object {
    const dim = this.subjectWiseDimension.filter(
      (item) => item.id === subjectID
    )[0].dimensions
    this.curriculumRelation = 'dimension'
    const tableHeader = [
      { text: this.evaluationSubtitle, style: 'subjectSubHeader' },
      { text: this.contentSubtitle, style: 'subjectSubHeader' },
    ]
    const widths = []
    dim.forEach((item, i) => {
      tableHeader.push({
        text: 'D' + (i + 1),
        style: 'subjectSubHeaderCenter',
      })
      widths.push('*')
    })
    const tableBody = []
    tableBody.push(tableHeader)
    if (evaluationCriteria.length) {
      evaluationCriteria.forEach((group) => {
        const evalNames = []
        const contentsData = []
        let dimensionData = []
        group.evaluationData.forEach((item) => {
          this.rowIndex++
          dimensionData.push(...item.dimensions)
          evalNames.push({
            columns: [
              {
                width: 'auto',
                text: this.rowIndex + '.',
                style: 'orderedList',
              },
              {
                width: '*',
                text: trimWhitespace(item.name),
              },
            ],
            margin: [-10, 0, 0, 0],
          })
        })
        if (group.contentData?.length) {
          group.contentData.forEach((entity) => {
            contentsData.push({ text: entity.name })
          })
        }
        // Get distinct basic skills
        dimensionData = [...new Set(dimensionData.map((items) => items.id))]
        const markedDimension = []
        dim.forEach((item) => {
          if (dimensionData.includes(item.id)) {
            markedDimension.push({
              text: '.',
              style: ['icon', 'mark'],
            })
          } else {
            markedDimension.push('')
          }
        })
        tableBody.push([
          {
            type: 'none',
            ul: evalNames,
          },
          {
            ul: contentsData,
          },
          ...markedDimension,
        ])
      })
    }
    if (customContents?.length) {
      tableBody.push([
        {
          text: this.customContentSubtitle,
          fillColor: '#fff',
          style: 'subjectSubHeader',
          colSpan: tableHeader.length,
        },
      ])
      customContents.map((item) => {
        tableBody.push([
          {
            ul: [
              {
                text: item.name,
              },
            ],
            colSpan: tableHeader.length,
          },
        ])
      })
    }
    const dimensionDesc = []
    dimensionDesc.push({
      text: this.footerDimension + ' ' + subjectName + '.',
      style: 'shortCode',
    })
    dim.forEach((item, i, array) => {
      dimensionDesc.push(
        { text: ' D' + (i + 1) + ': ', style: 'shortCode' },
        {
          text: item.name + (i === array.length - 1 ? ' ' : ','),
          style: 'shortCodeDesc',
        }
      )
    })
    return {
      id: 'subjectTableStart' + index,
      // unbreakable: true,
      tocItem: true,
      stack: [
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: subjectName.toUpperCase(), style: ['subjectHeader'] }],
            ],
          },
          layout: 'headerLayout',
        },
        {
          id: subjectName + '-criteriaStart',
          table: {
            widths: [180, 140, ...widths],
            headerRows: 1,
            // keepWithHeaderRows: 1,
            // dontBreakRows: true,
            body: tableBody,
          },
          layout: 'tertiaryLayout',
        },
        {
          text: dimensionDesc,
          margin: [0, 10, 0, 15],
        },
      ],
    }
  }

  evaluationNoRelation(
    subjectName: string,
    evaluationCriteria: any,
    customContents: any,
    index: number
  ): object {
    this.curriculumRelation = 'no-relation'
    console.log('no relation')
    const tableHeader = [
      {
        text: this.evaluationSubtitle,
        style: 'subjectSubHeader',
      },
      {
        text: this.contentSubtitle,
        style: 'subjectSubHeader',
      },
    ]
    const tableBody = []
    tableBody.push(tableHeader)
    if (evaluationCriteria.length) {
      evaluationCriteria.forEach((group) => {
        const evalNames = []
        const contentsData = []
        group.evaluationData.forEach((item) => {
          this.rowIndex++
          evalNames.push({
            columns: [
              {
                width: 'auto',
                text: this.rowIndex + '.',
                style: 'orderedList',
              },
              {
                width: '*',
                text: trimWhitespace(item.name),
              },
            ],
            margin: [-10, 0, 0, 0],
          })
        })
        if (group.contentData?.length) {
          group.contentData.forEach((entity) => {
            contentsData.push({
              text: entity.name,
            })
          })
        }
        tableBody.push([
          {
            type: 'none',
            ul: evalNames,
          },
          {
            ul: contentsData,
          },
        ])
      })
    }
    if (customContents?.length) {
      tableBody.push([
        {
          text: this.customContentSubtitle,
          fillColor: '#fff',
          style: 'subjectSubHeader',
          margin: [10, 0, 10, 0],
          colSpan: tableHeader.length,
        },
      ])
      customContents.map((item) => {
        tableBody.push([
          {
            text: item.name,
            margin: [10, 0, 10, 0],
            colSpan: tableHeader.length,
          },
        ])
      })
    }
    return {
      id: 'subjectTableStart' + index,
      unbreakable: true,
      // tocItem: true,
      stack: [
        {
          table: {
            widths: ['*'],
            body: [[{ text: subjectName, style: ['subjectHeader'] }]],
          },
          layout: 'headerLayout',
        },
        {
          id: subjectName + '-criteriaStart',
          table: {
            widths: ['*', '*'],
            headerRows: 1,
            keepWithHeaderRows: 1,
            dontBreakRows: true,
            body: tableBody,
          },
          layout: 'tertiaryLayout',
        },
      ],
    }
  }

  competencyRelation(): Promise<any> {
    console.log('Build Competency Relation Table: competencyRelation()')
    return new Promise((resolve, reject) => {
      const basicSkillTable = []
      const tableSubHeader = []
      const widths = []
      if (
        this.projectData.basicSkills.length &&
        this.curriculumRelation === 'no-relation'
      ) {
        for (const item of this.shortCodes.basicSkillCodes.slice(0, 7)) {
          tableSubHeader.push({
            text: item.code,
            style: 'subjectSubHeaderCenter',
          })
          widths.push('*')
        }
        basicSkillTable.push(tableSubHeader)

        const basicSkillData = this.projectData.basicSkills.map(
          (item) => item.code
        )
        const markedBasicSkill = []
        const basicSkillRelative = this.shortCodes.basicSkillCodes.slice(0, 7)
        console.log(this.projectData.basicSkills, basicSkillRelative)
        basicSkillRelative.forEach((item) => {
          console.log(basicSkillData, item)
          if (basicSkillData.includes(item.code)) {
            markedBasicSkill.push({
              text: '.',
              style: ['icon', 'mark'],
            })
          } else {
            markedBasicSkill.push(' ')
          }
        })
        console.log(markedBasicSkill)
        basicSkillTable.push([...markedBasicSkill])
        this.projectCompetencyRelation = {
          id: this.competenciasSubtitle,
          margin: [0, 10, 0, 10],
          stack: [
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      text: this.competenciasSubtitle,
                      style: ['subjectHeader'],
                    },
                  ],
                ],
              },
              layout: 'headerLayout',
            },
            {
              id: this.competenciasSubtitle + '-table',
              table: {
                widths: [...widths],
                headerRows: 1,
                keepWithHeaderRows: 1,
                dontBreakRows: true,
                body: basicSkillTable,
              },
              layout: 'competencyLayout',
            },
          ],
        }
        resolve(this.projectCompetencyRelation)
      } else {
        resolve()
      }
    })
  }

  // Build Driving Questions
  driving(): Promise<any> {
    console.log('Build Driving Question: driving()')
    return new Promise((resolve, reject) => {
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
        this.projectDrivingQns = {
          id: 'driving',
          tocItem: true,
          margin: [0, 20, 0, 0],
          table: {
            widths: ['*'],
            body: tableBody,
          },
          layout: 'defaultLayout',
        }
        resolve()
      } else {
        resolve()
      }
    })
  }

  // Build Themes
  themes(): object {
    console.log('Build Themes: themes()')
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

  // Build Final product
  finalProduct(): object {
    console.log('Build Final Product: finalProduct()')
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

  // Build Objectives and standards
  objectives(): Promise<any> {
    console.log('Build Objectives: objectives()')
    return new Promise((resolve, reject) => {
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
      this.projectObjectiveStandards = tableBody.length
        ? {
            id: 'objectives',
            tocItem: true,
            margin: [0, 10, 0, 10],
            table: {
              // headerRows: 1,
              // keepWithHeaderRows: 1,
              // dontBreakRows: true,
              widths: ['50%', '50%'],
              body: tableBody,
            },
            layout: 'defaultLayout',
          }
        : null
      resolve()
    })
  }

  // Get localizations for the content
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
        'PROGRAMACION.project_objectives_criterion',
        'PROGRAMACION.project_structure_stepsmenu_content',
        'PROGRAMACION.project_objectives_criteriawindow_basic_skills',
        'PROGRAMACION.project_content_extracontent',
        'PROGRAMACION.output_footer_dimensions',
        'PROGRAMACION.output_footer_competences',
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
        this.evaluationSubtitle =
          translations['PROGRAMACION.project_objectives_criterion']
        this.contentSubtitle =
          translations['PROGRAMACION.project_structure_stepsmenu_content']
        this.customContentSubtitle =
          translations['PROGRAMACION.project_content_extracontent']
        this.competenciasSubtitle =
          translations[
            'PROGRAMACION.project_objectives_criteriawindow_basic_skills'
          ]
        this.footerCompetencias =
          translations['PROGRAMACION.output_footer_competences']
        this.footerDimension =
          translations['PROGRAMACION.output_footer_dimensions']
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

  customOrderedList(item: string, styleName: string = ''): object {
    return {
      // markerColor: 'red',
      ol: [
        {
          text: trimWhitespace(item),
          style: styleName,
        },
      ],
    }
  }

  groupBy(objectArray: any, property: string): object {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }
}
