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

import {
  ActivityData,
  ActivityPhaseObject,
} from '../../../teacher/project-editor/constants/model/activity.model'

import { Step } from 'src/app/modules/teacher/project-editor/constants/model/project.model.js'

import { defaultStyle, styles } from './../../config/pdfCustomStyles'
import { fonts } from './../../config/pdfFonts'

import { TableLayouts } from '../../config/pdfTableLayouts'

import { SubSink } from '../../../../common-shared/utility/subsink.utility'
import { trimWhitespace } from '../../../../common-shared/utility/trim-whitespace.utility'

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
  activityChild: any[]
  pageWidth = 842
  pageHeight = 595

  // Project Variables
  projectId: string
  projectData: any
  activityID: string
  imageBase64: any
  title: string
  subscriptions = new SubSink()
  documentDefinition: object
  curriculumId: string
  showBasicSkill = false
  shortCodes: any
  steps: Step[]
  loading = true
  subjectEvaluation: any[] = []
  subjectsInline: string
  curriculumRelation: string
  rowIndex = 0
  subjectWiseDimension = []
  allCriterias: any[] = []
  allCriteriasAndContent: any
  projectImage: any
  projectBackground: object
  projectCoverText: object
  projectOverview: object
  projectObjectiveStandards: object
  projectDrivingQns: object
  projectEvaluationCriteria: object
  projectCompetencyRelation: object
  projectShortCodeDesc: object
  projectActivitiesData: ActivityData
  projectActivityList: object
  projectActivityInitialPhase: object
  projectActivityDevelopPhase: object
  projectActivitySynthesisPhase: object
  projectActivityInitialDetail: object
  projectActivityDevelopDetail: object
  projectActivitySynthesisDetail: object

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
  activitySectionTitle: string
  activityVariableHour: string
  activityVariableActivities: string
  activityVariableExercises: string
  activityInitialPhaseTitle: string
  activityDevelopPhaseTitle: string
  activitySynthesisPhaseTitle: string
  activityMinTitle: string
  activityVariableObjectives: string
  activityTeachingStrategies: string
  activityStudentGroups: string
  activityResources: string
  activityExercise: string
  activityExerciseOnline: string
  activityExerciseSchool: string
  activityExerciseNone: string
  activityExerciseQualified: string
  activityExerciseNotQualified: string
  activityDiversity: string
  activityModalityOnline: string
  activityModalityPresencial: string
  activityModalityBoth: string
  activityDesc: string

  // Other Variables
  errors = []
  pageBreakPoint = 450

  @ViewChild('pdfViewer') pdfViewerContainer

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private outputService: ProjectOutputService
  ) {}

  ngOnInit(): void {
    this.getLocalizations()
    this.projectId = this.route.snapshot.paramMap.get('id')
    this.activityID = this.route.snapshot.queryParamMap.get('activity')
    this.subscriptions.sink = combineLatest([
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
    this.subscriptions.unsubscribe()
  }

  // Get short codes of the Dimensions or basic skills based on the Curriculum ID
  getCodesAndEvaluationCriterias(): void {
    if (this.projectData.subjects.length) {
      const evalIds = []
      const contentIds = []
      this.projectData.subjects.map((item) => {
        const ids = item.evaluationCriteria.map(({ id }) => id)
        const cids = item.contents.map(({ id }) => id)
        evalIds.push(...ids)
        contentIds.push(...cids)
      })
      if (evalIds.length) {
        this.getImagedata()
          .then(() => this.callAPICodesAndEvaluation(evalIds, contentIds))
          .then(() => this.arrayCreation())
          .then(() => this.extractSubjectWiseDimension())
      } else {
        this.getImagedata()
          .then(() => this.arrayCreation())
          .then(() => this.contents())
      }
    }
  }

  getImagedata(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.isStepDone(6)) {
        this.subscriptions.sink = this.outputService
          .getJsonData(this.projectData?.creativeImage + '.json')
          .pipe(
            catchError((err) => {
              this.errors.push(err.error)
              return throwError(err)
            })
          )
          .subscribe((data) => {
            this.imageBase64 = data.data
            resolve()
          })
      } else {
        resolve()
      }
    })
  }

  callAPICodesAndEvaluation(
    evalIds: Array<number>,
    contentIds: Array<number>
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.subscriptions.sink = forkJoin([
        this.outputService.getCodes(this.curriculumId),
        this.outputService.getCrtieriasDetails(evalIds),
        this.outputService.getCriteriaAndContentGradeWise(
          evalIds,
          contentIds?.length ? contentIds : 0
        ),
        this.outputService.getCurriculumRelation(
          this.projectData.region.id,
          this.projectData.stage
        ),
        this.outputService.getBasicSkillShow(this.projectData.curriculumId),
      ])
        .pipe(
          catchError((err) => {
            this.errors.push(err.error)
            return throwError(err)
          })
        )
        .subscribe(
          ([
            codes,
            baseCriterias,
            criteriasContents,
            relation,
            curriculumBasicSkill,
          ]) => {
            if (codes) {
              this.shortCodes = codes
            }
            if (baseCriterias) {
              this.allCriterias = baseCriterias
            }
            if (criteriasContents) {
              this.allCriteriasAndContent = criteriasContents
            }
            if (relation) {
              this.curriculumRelation = relation.curriculumType
            }
            if (curriculumBasicSkill) {
              curriculumBasicSkill.forEach(({ showBasicskill }) => {
                this.showBasicSkill = showBasicskill
              })
            }
            resolve()
          }
        )
    })
  }

  arrayCreation(): Promise<any> {
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
              const subjectWiseEvalIds = evaluationCriteria.map(({ id }) => id)
              const subjectWiseContentIds = contents.map(({ id }) => id)
              const evaluation = this.allCriteriasAndContent?.evaluationCriteriaRPs.filter(
                (item) => subjectWiseEvalIds.includes(item.id)
              )
              const derivedContents = this.allCriteriasAndContent?.contentRPs.filter(
                (item) => subjectWiseContentIds.includes(item.id)
              )
              this.subjectWiseDimension = []
              let buildEvaluation = []
              buildEvaluation = evaluation?.map((item) => {
                const baseEval = this.allCriterias.find(
                  (bev) => bev.id === item.id
                )
                return {
                  ...item,
                  basicSkills: baseEval.basicSkills,
                  dimensions: baseEval.dimensions,
                  namepdf: baseEval.namepdf,
                }
              })
              if (this.curriculumRelation === 'DIMENSIONS_RELATED') {
                this.subjectWiseDimension.push(
                  this.outputService.getSubjectWiseDimension(subjectID)
                )
              }
              const groupedData = []
              if (buildEvaluation?.length) {
                const groupedEvaluation = this.groupBy(
                  buildEvaluation,
                  'gradeId'
                )
                const groupedContent = this.groupBy(derivedContents, 'gradeId')
                for (const key of Object.keys(groupedEvaluation)) {
                  groupedData.push({
                    gradeId: key,
                    evaluationData: groupedEvaluation[key],
                    contentData: groupedContent[key] ? groupedContent[key] : [],
                  })
                }
              }
              this.subjectEvaluation.push({
                subjectID,
                subjectName: name,
                customContents,
                evaluationCriteria: groupedData,
                subjectRelation: this.curriculumRelation,
                subjectDimensions: this.subjectWiseDimension,
              })
            }
          )
        )
        if (this.projectData.activities) {
          const duration = this.projectData.activities.reduce(
            (a, b) => a + (b.duration || 0),
            0
          )
          const activitiesCount = this.projectData.activities.length
          const exercisesCount = this.projectData.activities.reduce(
            (a, b) => a + (b.exercises?.length || 0),
            0
          )
          const groupedActivities: ActivityPhaseObject = this.groupBy(
            this.projectData.activities,
            'phase'
          )
          this.projectActivitiesData = {
            duration,
            activitiesCount,
            exercisesCount,
            intialPhase: groupedActivities?.INITIAL,
            developPhase: groupedActivities?.DEVELOP,
            synthesisPhase: groupedActivities?.SYNTHESIS,
          }
        }

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
            if (
              subjectRelation === 'DIMENSIONS_RELATED' &&
              subjectDimensions.length
            ) {
              this.subscriptions.sink = forkJoin(subjectDimensions)
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
            text: '',
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
        this.projectActivityList,
        this.projectActivityInitialPhase,
        this.projectActivityDevelopPhase,
        this.projectActivitySynthesisPhase,
        this.projectActivityInitialDetail,
        this.projectActivityDevelopDetail,
        this.projectActivitySynthesisDetail,
      ],
      pageBreakBefore(currentNode: any): boolean {
        if (
          (currentNode.id === 'driving' ||
            currentNode.id === 'objectives' ||
            String(currentNode.id).includes('subjectTableStart') ||
            currentNode.id === 'compentenceRelation') &&
          currentNode.startPosition.top > thisRef.pageBreakPoint
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
          (currentNode.id === 'activityObjectivetable' ||
            currentNode.id === 'activitySContenttable' ||
            currentNode.id === 'activityStandardtable' ||
            currentNode.id === 'activityResourcestable' ||
            currentNode.id === 'activityDiversitytable' ||
            currentNode.id === 'activityExercisetable') &&
          currentNode.startPosition.top >
            currentNode.startPosition.pageInnerHeight
        ) {
          return true
        }

        if (
          (currentNode.id === 'activityList-initial' ||
            currentNode.id === 'activityList-develop' ||
            currentNode.id === 'activityList-synthesis') &&
          currentNode.startPosition.top >
            currentNode.startPosition.pageInnerHeight
        ) {
          return true
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
    Promise.all([
      this.coverPage(),
      this.overview(),
      this.evaluationCriteria(),
      this.competencyRelation(),
      this.objectives(),
      this.driving(),
      this.activityList(),
      this.ActivityDetail(),
    ]).then((values) => {
      this.generatePDF()
    })
  }

  activityList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.projectData.activities?.length) {
        if (this.projectActivitiesData.intialPhase?.length) {
          this.projectActivityInitialPhase = this.phaseWiseActivityList(
            this.activityInitialPhaseTitle,
            this.projectActivitiesData.intialPhase,
            'initial'
          )
        }
        if (this.projectActivitiesData.developPhase?.length) {
          this.projectActivityDevelopPhase = this.phaseWiseActivityList(
            this.activityDevelopPhaseTitle,
            this.projectActivitiesData.developPhase,
            'develop'
          )
        }
        if (this.projectActivitiesData.synthesisPhase?.length) {
          this.projectActivitySynthesisPhase = this.phaseWiseActivityList(
            this.activitySynthesisPhaseTitle,
            this.projectActivitiesData.synthesisPhase,
            'synthesis'
          )
        }
        const totalDuration: any = (
          this.projectActivitiesData.duration / 60
        ).toFixed(1)
        this.projectActivityList = {
          pageBreak: 'before',
          id: 'activityList',
          tocItem: true,
          margin: [0, 5, 0, 0],
          columns: [
            {
              text: this.activitySectionTitle,
              alignment: 'left',
              style: 'activityMainHead',
            },
            {
              width: 'auto',
              alignment: 'center',
              layout: 'resumenLayout',
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      columnGap: 10,
                      columns: [
                        {
                          width: 'auto',
                          text:
                            Math.abs(totalDuration) +
                            ' ' +
                            (totalDuration > 1
                              ? this.activityVariableHour.split('|')[1]
                              : this.activityVariableHour.split('|')[0]
                            ).toUpperCase(),
                          style: 'resumenCell',
                          margin: [4, 0, 0, 0],
                        },
                        {
                          width: 1,
                          text: '|',
                          style: ['icon', 'resumenSeparator'],
                          margin: [0, 2, 0, 0],
                        },
                        {
                          width: 'auto',
                          text:
                            this.projectActivitiesData.activitiesCount +
                            ' ' +
                            (this.projectActivitiesData.activitiesCount > 1
                              ? this.activityVariableActivities.split('|')[1]
                              : this.activityVariableActivities.split('|')[0]
                            ).toUpperCase(),
                          style: 'resumenCell',
                        },
                        {
                          width: 1,
                          text: '|',
                          style: ['icon', 'resumenSeparator'],
                          margin: [0, 2, 0, 0],
                        },
                        {
                          width: 'auto',
                          text:
                            this.projectActivitiesData.exercisesCount +
                            ' ' +
                            (this.projectActivitiesData.exercisesCount > 1
                              ? this.activityVariableExercises.split('|')[1]
                              : this.activityVariableExercises.split('|')[0]
                            ).toUpperCase(),
                          style: 'resumenCell',
                          margin: [0, 0, 4, 0],
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          ],
        }
        resolve('activity list completed')
      } else {
        resolve('activity list completed')
      }
    })
  }

  // Activity List
  phaseWiseActivityList(name: string, arr: any, type: string): object {
    const initialData = []
    initialData.push([
      {
        colSpan: 9,
        text: [
          name.toUpperCase() +
            ' (' +
            arr.length +
            ' ' +
            (arr.length > 1
              ? this.activityVariableActivities.split('|')[1]
              : this.activityVariableActivities.split('|')[0]
            ).toUpperCase() +
            ')',
        ],
        style: ['activity'],
        margin: [-20, 14, 0, 0],
      },
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ])
    arr.forEach((item) => {
      initialData.push([
        {
          text: item.name,
          style: 'activityListTitle',
        },
        {
          text: '|',
          style: ['icon', 'activitySeparator'],
        },
        {
          text: [
            {
              text: '* ',
              style: ['icon', 'activityListIcon'],
            },
            {
              text:
                (item.duration ? item.duration : 0) +
                ' ' +
                this.activityMinTitle.toUpperCase(),
              style: 'activityListCellText',
            },
          ],
          alignment: 'center',
        },
        {
          text: '|',
          style: ['icon', 'activitySeparator'],
        },
        {
          text: [
            {
              text: '@ ',
              style: ['icon', 'activityListIcon'],
            },
            {
              text:
                (item.objectives?.length > 1
                  ? this.activityVariableObjectives.split('|')[1].toUpperCase()
                  : this.activityVariableObjectives
                      .split('|')[0]
                      .toUpperCase()) +
                ' ' +
                (item.objectives?.length ? item.objectives.length : 0),
              style: 'activityListCellText',
            },
          ],
          alignment: 'center',
        },
        {
          text: '|',
          style: ['icon', 'activitySeparator'],
        },
        {
          text: this.modalityCheck(item.modality),
          alignment: 'center',
          style: 'activityListCellText',
        },
        {
          text: '|',
          style: ['icon', 'activitySeparator'],
        },
        {
          text: [
            {
              text: '! ',
              style: ['icon', 'activityListIcon'],
            },
            {
              text:
                (item.exercises?.length ? item.exercises.length : 0) +
                ' ' +
                (item.exercises?.length > 1
                  ? this.activityVariableExercises.split('|')[1].toUpperCase()
                  : this.activityVariableExercises.split('|')[0].toUpperCase()),
              style: 'activityListCellText',
            },
          ],
          alignment: 'center',
        },
      ])
    })
    return {
      id: 'activityList-' + type,
      layout: 'activityList',
      table: {
        headerRows: 1,
        dontBreakRows: true,
        widths: [350, 1, 55, 1, 75, 1, '*', 1, 80],
        body: initialData,
      },
      margin: [0, 0, 0, 5],
    }
  }

  ActivityDetail(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.projectData.activities?.length) {
        if (this.projectActivitiesData.intialPhase?.length) {
          this.projectActivityInitialDetail = this.phaseWiseActivityDetails(
            this.activityInitialPhaseTitle,
            this.projectActivitiesData.intialPhase,
            'initial'
          )
        }
        if (this.projectActivitiesData.developPhase?.length) {
          this.projectActivityDevelopDetail = this.phaseWiseActivityDetails(
            this.activityDevelopPhaseTitle,
            this.projectActivitiesData.developPhase,
            'develop'
          )
        }
        if (this.projectActivitiesData.synthesisPhase?.length) {
          this.projectActivitySynthesisDetail = this.phaseWiseActivityDetails(
            this.activitySynthesisPhaseTitle,
            this.projectActivitiesData.synthesisPhase,
            'synthesis'
          )
        }
        resolve('activity detail completed')
      } else {
        resolve('activity detail completed')
      }
    })
  }

  // Activity List Details
  phaseWiseActivityDetails(name: string, arr: any, type: string): object {
    let details = []
    details = arr.map((item, index) => {
      const teachingStrategies = []
      const studentGroups = []
      const objectives = []
      const contents = []
      const standards = []
      const exercisesList = []
      const resources = []

      const renderDescSubjectsTable = [
        {
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  stack: [
                    {
                      text: item.description?.length ? this.activityDesc : '',
                      style: 'activityDetailSubhead',
                    },
                    {
                      text: item.description ? item.description : '',
                      style: 'activityDetailDesc',
                    },
                  ],
                },
                {
                  stack: [
                    {
                      text: item.subjects?.length ? this.subjectsTitle : '',
                      style: 'activityDetailSubhead',
                    },
                    {
                      text: item.subjects?.length
                        ? item.subjects
                            ?.map(({ name: subjectName }) => subjectName)
                            .join(', ')
                        : '',
                      style: 'activityDetailDesc',
                    },
                  ],
                },
              ],
            ],
          },
        },
        '',
      ]

      item.teachingStrategies?.forEach(({ name: tsname }) =>
        teachingStrategies.push(tsname)
      )
      item.customTeachingStrategies?.forEach(({ name: ctsname }) =>
        teachingStrategies.push(ctsname)
      )

      item.studentGroups?.forEach(({ name: sgname }) =>
        studentGroups.push(sgname)
      )
      item.customStudentGroups?.forEach(({ name: csgname }) =>
        studentGroups.push(csgname)
      )
      const renderTeachingAndSGroupTable = [
        {
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: teachingStrategies?.length
                    ? this.activityTeachingStrategies
                    : '',
                  style: 'activityDetailSubhead',
                },
                {
                  text: studentGroups?.length ? this.activityStudentGroups : '',
                  style: 'activityDetailSubhead',
                },
              ],
              [
                {
                  text: teachingStrategies?.length
                    ? teachingStrategies?.join(', ')
                    : '',
                  style: 'activityDetailDesc',
                },
                {
                  text: studentGroups?.length ? studentGroups?.join(', ') : '',
                  style: 'activityDetailDesc',
                },
              ],
            ],
          },
        },
        '',
      ]

      // Activity Objectives
      objectives.push([
        {
          text:
            item.objectives?.length > 1
              ? this.activityVariableObjectives
                  .split('|')[1]
                  .charAt(0)
                  .toUpperCase() +
                this.activityVariableObjectives.split('|')[1].slice(1)
              : this.activityVariableObjectives
                  .split('|')[0]
                  .charAt(0)
                  .toUpperCase() +
                this.activityVariableObjectives.split('|')[0].slice(1),
          style: 'activityDetailSubhead',
        },
      ])
      item.objectives?.forEach(({ name: objname }, id) =>
        objectives.push([
          {
            columns: [
              {
                width: 12,
                text: id + 1 + '.',
                style: 'activityObjectiveNo',
                margin: [0, 0, 2, 0],
              },
              {
                text: objname,
              },
            ],
            style: ['listGap', 'activityDetailDesc'],
          },
        ])
      )
      const renderObjectiveTable = [
        {
          id: 'activityObjectivetable',
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*'],
            headerRows: 1,
            body: objectives,
          },
        },
        '',
      ]

      // Activity Contents
      contents.push([
        {
          text: this.contentSubtitle,
          style: 'activityDetailSubhead',
        },
      ])
      item.contents?.forEach(({ name: cname }) =>
        contents.push([
          {
            ul: [{ text: cname }],
            style: ['listGap', 'activityDetailDesc'],
          },
        ])
      )
      item.customcontents?.forEach(({ name: ccname }) =>
        contents.push([
          {
            ul: [{ text: ccname }],
            style: ['listGap', 'activityDetailDesc'],
          },
        ])
      )
      const renderContentTable = [
        {
          id: 'activitySContenttable',
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*'],
            body: contents,
          },
        },
        '',
      ]

      // Activity Standards
      standards.push([
        {
          text: this.standardsTitle,
          style: 'activityDetailSubhead',
        },
      ])
      item.standards?.forEach(({ name: sname }) =>
        standards.push([
          { ul: [{ text: sname }], style: ['listGap', 'activityDetailDesc'] },
        ])
      )
      item.customStandards?.forEach(({ name: csname }) =>
        standards.push([
          { ul: [{ text: csname }], style: ['listGap', 'activityDetailDesc'] },
        ])
      )
      const renderStandardTable = [
        {
          id: 'activityStandardtable',
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*'],
            body: standards,
          },
        },
        '',
      ]

      // Activity Resources
      resources.push([
        {
          text: this.activityResources,
          style: 'activityDetailSubhead',
        },
      ])
      item.resources?.forEach(({ name: objname }) =>
        resources.push([
          {
            ul: [{ text: this.identifyLink(objname) }],
            style: ['listGap', 'activityDetailDesc'],
          },
        ])
      )
      const renderResourcesTable = [
        {
          id: 'activityResourcestable',
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*'],
            body: resources,
          },
        },
        '',
      ]

      const renderDiversity = [
        {
          id: 'activityDiversitytable',
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: this.activityDiversity,
                  style: 'activityDetailSubhead',
                },
              ],
              [
                {
                  text: item.diversity,
                  style: ['activityDetailDesc'],
                },
              ],
            ],
          },
        },
        '',
      ]

      exercisesList.push([
        {
          text: this.activityExercise,
          style: 'activityDetailSubhead',
        },
      ])
      item.exercises?.forEach((exercise, i) => {
        const qualify = exercise.evaluation
          ? this.activityExerciseQualified
          : this.activityExerciseNotQualified
        const delivery = exercise.delivery
          ? exercise.delivery === 'PRESENCIAL'
            ? this.activityExerciseSchool
            : this.activityExerciseOnline
          : this.activityExerciseNone
        exercisesList.push([
          {
            columns: [
              {
                width: 15,
                text: i + 1 + '.',
                margin: [0, 0, 2, 0],
              },
              {
                width: 'auto',
                text: exercise.name,
                margin: [0, 0, 4, 0],
              },
              {
                width: 'auto',
                text: ' (' + qualify + ',' + delivery + ')',
                style: 'activityExerciseStatus',
              },
            ],
            style: ['listGap', 'activityExerciseName'],
          },
        ])
      })

      const renderExerciseTable = [
        {
          id: 'activityExercisetable',
          colSpan: 2,
          layout: 'rowTable',
          table: {
            widths: ['*'],
            body: exercisesList,
          },
        },
        '',
      ]

      const renderAllTables = []

      renderAllTables.push([
        {
          colSpan: 2,
          columnGap: 10,
          columns: [
            {
              width: 'auto',
              text: name.toUpperCase(),
              style: 'actDetailPhase',
            },
            {
              width: 1,
              text: '|',
              style: ['icon', 'actDetailSeparator'],
              margin: [0, 1, 0, 0],
            },
            {
              width: 'auto',
              text: [
                {
                  text: '* ',
                  style: 'icon',
                  fontSize: 9,
                },
                {
                  text:
                    (item.duration ? item.duration : '0') +
                    ' ' +
                    this.activityMinTitle.toUpperCase(),
                  style: 'actDetailIndicator',
                },
              ],
            },
            {
              width: 1,
              text: '|',
              style: ['icon', 'actDetailSeparator'],
              margin: [0, 1, 0, 0],
            },
            {
              width: '*',
              text: item.modality ? this.modalityCheck(item.modality) : '',
              style: 'actDetailIndicator',
            },
          ],
        },
        '',
      ])

      renderAllTables.push([
        {
          colSpan: 2,
          text: item.name,
          style: 'activityDetailHead',
          margin: [0, 5, 0, 5],
        },
        '',
      ])

      if (item.description || item.subjects?.length) {
        renderAllTables.push(renderDescSubjectsTable)
      }

      if (teachingStrategies?.length > 1 || studentGroups?.length > 1) {
        renderAllTables.push(renderTeachingAndSGroupTable)
      }

      if (objectives?.length > 1) {
        renderAllTables.push(renderObjectiveTable)
      }

      if (contents?.length > 1) {
        renderAllTables.push(renderContentTable)
      }

      if (standards?.length > 1) {
        renderAllTables.push(renderStandardTable)
      }

      if (resources?.length > 1) {
        renderAllTables.push(renderResourcesTable)
      }

      if (item.diversity) {
        renderAllTables.push(renderDiversity)
      }

      if (exercisesList?.length > 1) {
        renderAllTables.push(renderExerciseTable)
      }

      renderAllTables?.map((section, i) => {
        if (i === renderAllTables?.length - 1) {
          section.forEach((sectionCol, sectionColIndex) => {
            if (sectionColIndex === 0 && sectionCol.table?.body.length) {
              sectionCol.table.body[
                sectionCol.table.body.length - 1
              ][0].border = [false, false, false, false]
            }
          })
        }
      })
      return {
        pageBreak: index === arr.length - 1 ? '' : 'after',
        id: 'activityDetail' + type + '-' + item.id,
        layout: 'activityDetails',
        table: {
          widths: ['*', '*'],
          body: renderAllTables,
        },
      }
    })

    return {
      id: 'activityDetails-' + type,
      tocItem: true,
      pageBreak: 'before',
      stack: [...details],
    }
  }

  // Build Cover page
  coverPage(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.subjectsInline = this.projectData.subjects
        ?.map((item) => item.name)
        .join(', ')
      if (this.isStepDone(6) && this.imageBase64) {
        this.projectImage = {
          image: this.imageBase64,
          width: 435,
          height: 435,
          absolutePosition: { x: 385, y: 105 },
        }
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
      resolve('coverPage completed')
    })
  }

  // PDF Viewer after event
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf
    this.loading = false
    this.totalPages = pdf.numPages
    const toc = this.generatedPDF.docDefinition.content.filter(
      (content) => content.tocItem
    )
    const activityIndex = []
    this.generatedPDF.docDefinition.content
      .filter((content) => {
        return content.id?.includes('activityDetails-')
      })
      ?.forEach((phase) => {
        phase.stack?.forEach((activity) => {
          activityIndex.push({
            activityID: activity.id.split('-')[1],
            pageNumber: activity.nodeInfo.pageNumbers[0],
          })
        })
      })
    this.loadOutline(toc).then(() => this.initialNavigation(activityIndex))
  }

  // Get Outlines from the PDF Viewer
  loadOutline(toc: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.outline = []
      this.activityChild = []
      toc
        .filter(({ id }) => id.includes('activityDetails'))
        .forEach((item) => {
          this.activityChild.push({
            id: item.id,
            title: this.chooseOutlineTitle(item.id),
            pageNumber: item.positions[0].pageNumber,
            lastPageNumber:
              item.nodeInfo.pageNumbers[item.nodeInfo.pageNumbers.length - 1],
          })
        })
      toc.map((item) => {
        if (!item.id.includes('activityDetails')) {
          this.outline.push({
            id: item.id,
            title: this.chooseOutlineTitle(item.id),
            pageNumber: item.positions[0].pageNumber,
            lastPageNumber:
              item.nodeInfo.pageNumbers[item.nodeInfo.pageNumbers.length - 1],
            items: item.id.includes('activityList') ? this.activityChild : null,
          })
        }
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
      resolve()
    })
  }

  initialNavigation(activityIndex: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.activityID) {
        const isActivity = activityIndex.find(
          (activity) => this.activityID === activity.activityID
        )
        setTimeout(() => {
          this.scrollToPage(isActivity.pageNumber)
        }, 500)
        resolve()
      } else {
        resolve()
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
      case 'activityList':
        title = this.activitySectionTitle
        break
      case 'activityDetails-initial':
        title =
          this.activityInitialPhaseTitle.charAt(0).toUpperCase() +
          this.activityInitialPhaseTitle.slice(1)
        break
      case 'activityDetails-develop':
        title =
          this.activityDevelopPhaseTitle.charAt(0).toUpperCase() +
          this.activityDevelopPhaseTitle.slice(1)
        break
      case 'activityDetails-synthesis':
        title =
          this.activitySynthesisPhaseTitle.charAt(0).toUpperCase() +
          this.activitySynthesisPhaseTitle.slice(1)
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
    return new Promise(async (resolve, reject) => {
      this.projectOverview = {
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
      resolve('overview completed')
    })
  }

  // Build Evaluation Criteria and Contents
  evaluationCriteria(): Promise<any> {
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
              if (subjectRelation === 'BASIC_SKILLS_RELATED') {
                return this.evaluationBasicSkill(
                  subjectName,
                  evaluationCriteria,
                  customContents,
                  index
                )
              } else if (subjectRelation === 'DIMENSIONS_RELATED') {
                return this.evaluationDimension(
                  subjectID,
                  subjectName,
                  evaluationCriteria,
                  customContents,
                  index
                )
              } else if (subjectRelation === 'NO_RELATION') {
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
        resolve('Evaluation completed')
      } else {
        resolve('Evaluation completed')
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
      widths.push('*')
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
                width: 12,
                text: this.rowIndex + '.',
                style: ['orderedList', 'contentText'],
              },
              {
                width: '*',
                text: trimWhitespace(item.namepdf),
                style: ['contentText'],
              },
            ],
            margin: [-8, 3, 0, 2],
          })
        })
        if (group.contentData?.length) {
          group.contentData.forEach((entity) => {
            contentsData.push({ text: entity.name, margin: [0, 3, 0, 4] })
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
    const customContentBody = []
    let customContentSection = {}
    if (customContents?.length) {
      customContentBody.push([
        {
          text: this.customContentSubtitle,
          fillColor: '#fff',
          style: 'subjectSubHeader',
        },
      ])
      customContents.map((item) => {
        customContentBody.push([
          {
            ul: [
              {
                text: item.name,
                style: ['contentText'],
              },
            ],
          },
        ])
      })
      customContentSection = {
        id: subjectName + '-customContent',
        table: {
          widths: ['*'],
          headerRows: 1,
          dontBreakRows: true,
          body: customContentBody,
        },
        layout: 'finalLayout',
      }
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
            widths: [200, 'auto', ...widths],
            headerRows: 1,
            body: tableBody,
          },
          layout: customContents?.length ? 'tertiaryLayout' : 'finalLayout',
        },
        customContentSection,
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
                width: 12,
                text: this.rowIndex + '.',
                style: ['orderedList', 'contentText'],
              },
              {
                width: '*',
                text: trimWhitespace(item.namepdf),
                style: ['contentText'],
              },
            ],
            margin: [-8, 3, 0, 2],
          })
        })
        if (group.contentData?.length) {
          group.contentData.forEach((entity) => {
            contentsData.push({ text: entity.name, margin: [0, 3, 0, 4] })
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
            style: ['contentText'],
          },
          {
            ul: contentsData,
            style: ['contentText'],
          },
          ...markedDimension,
        ])
      })
    }
    const customContentBody = []
    let customContentSection = {}
    if (customContents?.length) {
      customContentBody.push([
        {
          text: this.customContentSubtitle,
          fillColor: '#fff',
          style: 'subjectSubHeader',
        },
      ])
      customContents.map((item) => {
        customContentBody.push([
          {
            ul: [
              {
                text: item.name,
                style: ['contentText'],
              },
            ],
          },
        ])
      })
      customContentSection = {
        id: subjectName + '-customContent',
        table: {
          widths: ['*'],
          headerRows: 1,
          dontBreakRows: true,
          body: customContentBody,
        },
        layout: 'finalLayout',
      }
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
            widths: [220, 200, ...widths],
            headerRows: 1,
            body: tableBody,
          },
          layout: customContents?.length ? 'tertiaryLayout' : 'finalLayout',
        },
        customContentSection,
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
                width: 12,
                text: this.rowIndex + '.',
                style: ['orderedList', 'contentText'],
              },
              {
                width: '*',
                text: trimWhitespace(item.namepdf),
                style: ['contentText'],
              },
            ],
            margin: [-8, 3, 0, 2],
          })
        })
        if (group.contentData?.length) {
          group.contentData.forEach((entity) => {
            contentsData.push({
              text: entity.name,
              margin: [0, 3, 0, 4],
              style: ['contentText'],
            })
          })
        }
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
        ])
      })
    }
    const customContentBody = []
    let customContentSection = {}
    if (customContents?.length) {
      customContentBody.push([
        {
          text: this.customContentSubtitle,
          fillColor: '#fff',
          style: 'subjectSubHeader',
        },
      ])
      customContents.map((item) => {
        customContentBody.push([
          {
            text: item.name,
            style: ['contentText'],
          },
        ])
      })
      customContentSection = {
        id: subjectName + '-customContent',
        table: {
          widths: ['*'],
          headerRows: 1,
          body: customContentBody,
        },
        layout: 'finalLayout',
      }
    }
    return {
      id: 'subjectTableStart' + index,
      unbreakable: true,
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
            widths: ['*', '*'],
            headerRows: 1,
            body: tableBody,
          },
          layout: customContents?.length ? 'tertiaryLayout' : 'finalLayout',
        },
        customContentSection,
      ],
    }
  }

  competencyRelation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isStepDone(3) && this.isStepDone(4)) {
        const basicSkillTable = []
        const tableSubHeader = []
        const widths = []
        if (
          this.curriculumRelation === 'NO_RELATION' ||
          (this.curriculumRelation === 'DIMENSIONS_RELATED' &&
            this.showBasicSkill)
        ) {
          for (const item of this.shortCodes.basicSkillCodes) {
            tableSubHeader.push({
              text: item.name,
              style: 'subjectSubHeaderCenter',
            })
            widths.push('*')
          }
          basicSkillTable.push(tableSubHeader)

          const basicSkillData = this.projectData.basicSkills.map(
            (item) => item.code
          )
          const markedBasicSkill = []
          const basicSkillRelative = this.shortCodes.basicSkillCodes
          basicSkillRelative.forEach((item) => {
            if (basicSkillData.includes(item.code)) {
              markedBasicSkill.push({
                text: '.',
                style: ['icon', 'mark'],
              })
            } else {
              markedBasicSkill.push(' ')
            }
          })
          basicSkillTable.push([...markedBasicSkill])
          this.projectCompetencyRelation = {
            id: 'compentenceRelation',
            margin: [0, 10, 0, 10],
            unbreakable: true,
            stack: [
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: this.competenciasSubtitle.toUpperCase(),
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
                  body: basicSkillTable,
                },
                layout: 'competencyLayout',
              },
            ],
          }
          resolve('competency relation completed')
        } else {
          resolve('competency relation completed')
        }
      } else {
        resolve('competency relation completed')
      }
    })
  }

  // Build Driving Questions
  driving(): Promise<any> {
    return new Promise((resolve, reject) => {
      const questionList = this.projectData?.drivingQuestions
      if (this.isStepDone(7) && questionList?.length) {
        const tableBody = []
        tableBody.push([
          {
            text: this.drivingQuestionsTitle.toUpperCase(),
            style: 'tableHeader',
          },
        ])
        questionList.forEach((item) => {
          tableBody.push([
            {
              ul: [item.name],
              style: ['contentText'],
            },
          ])
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
        resolve('driving completed')
      } else {
        resolve('driving completed')
      }
    })
  }

  // Build Themes
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
      const dataRow = []
      themesList.forEach((item, i) => {
        dataRow.push({
          text: trimWhitespace(item.name),
          margin: i === themesList.length - 1 ? [6, 0, 6, 0] : [6, 0, 6, 5],
        })
      })
      tableBody.push([
        {
          ul: dataRow,
          style: ['contentText'],
        },
      ])
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
              style: ['contentText'],
              lineHeight: 1.25,
              margin: [6, 0],
            },
          ],
        ],
      },
      layout: 'secondaryLayout',
    }
  }

  // Build Objectives and standards
  objectives(): Promise<any> {
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
          const standards = allStandards.map((standard, i) => {
            return {
              text: trimWhitespace(standard.name),
              margin:
                i === allStandards.length - 1 ? [6, 0, 6, 0] : [6, 0, 6, 5],
            }
          })
          tableBody.push([
            {
              columns: [
                {
                  width: 12,
                  text: row + 1 + '.',
                  style: ['orderedList', 'contentText'],
                },
                {
                  width: '*',
                  text: trimWhitespace(item.name),
                  style: 'contentText',
                },
              ],
            },
            {
              ul: standards,
              style: 'contentText',
            },
          ])
        })
      }
      this.projectObjectiveStandards = tableBody.length
        ? {
            id: 'objectives',
            tocItem: true,
            margin: [0, 10, 0, 10],
            table: {
              widths: ['50%', '50%'],
              body: tableBody,
            },
            layout: 'defaultLayout',
          }
        : null
      resolve('objectives completed')
    })
  }

  // Get localizations for the content
  getLocalizations(): void {
    this.subscriptions.sink = this.translateService
      .stream([
        'PROGRAMACION.project_startingpoint_year',
        'PROGRAMACION.project_startingpoint_grades',
        'PROGRAMACION.project_startingpoint_subjects',
        'PROGRAMACION.project_structure_stepsmenu_thematic',
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
        'PROGRAMACION.output_index_activities',
        'PROGRAMACION.output_intropage_teachers',
        'PROGRAMACION.variable_hours',
        'PROGRAMACION.variable_activities',
        'PROGRAMACION.variable_exercices',
        'PROGRAMACION.variable_objetivos',
        'PROGRAMACION.activity_duration_minutes',
        'PROGRAMACION.activity_strategies',
        'PROGRAMACION.activity_groups',
        'PROGRAMACION.activity_resources',
        'PROGRAMACION.exercise_delivery_modality_online',
        'PROGRAMACION.exercise_delivery_modality_school',
        'PROGRAMACION.exercise_delivery_modality_none',
        'PROGRAMACION.activity_diversity',
        'ACTIVITIES.activities_phase_initial',
        'ACTIVITIES.activities_phase_development',
        'ACTIVITIES.activities_phase_syntesis',
        'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item1',
        'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item2',
        'PROGRAMACION.activity_modality_item3_output',
        'EXCERCISE_CARD.exercise_evaluation_noncalificable',
        'EXCERCISE_CARD.exercise_evaluation_calificable',
        'ACTIVITY_PREVIEW.activity_detail_exercises_title',
        'PROGRAMACION.activity_description',
      ])
      .subscribe((translations) => {
        this.academicYearTitle =
          translations['PROGRAMACION.project_startingpoint_year']
        this.gradesTitle =
          translations['PROGRAMACION.project_startingpoint_grades']
        this.subjectsTitle =
          translations['PROGRAMACION.project_startingpoint_subjects']
        this.themesTitle =
          translations['PROGRAMACION.project_structure_stepsmenu_thematic']
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
        this.activitySectionTitle =
          translations['PROGRAMACION.output_index_activities']
        this.activityVariableHour = translations['PROGRAMACION.variable_hours']
        this.activityVariableActivities =
          translations['PROGRAMACION.variable_activities']
        this.activityVariableExercises =
          translations['PROGRAMACION.variable_exercices']
        this.activityInitialPhaseTitle =
          translations['ACTIVITIES.activities_phase_initial']
        this.activityDevelopPhaseTitle =
          translations['ACTIVITIES.activities_phase_development']
        this.activitySynthesisPhaseTitle =
          translations['ACTIVITIES.activities_phase_syntesis']
        this.activityMinTitle =
          translations['PROGRAMACION.activity_duration_minutes']
        this.activityVariableObjectives =
          translations['PROGRAMACION.variable_objetivos']
        this.activityTeachingStrategies =
          translations['PROGRAMACION.activity_strategies']
        this.activityStudentGroups =
          translations['PROGRAMACION.activity_groups']
        this.activityResources = translations['PROGRAMACION.activity_resources']
        this.activityExercise =
          translations['ACTIVITY_PREVIEW.activity_detail_exercises_title']
        this.activityExerciseOnline =
          translations['PROGRAMACION.exercise_delivery_modality_online']
        this.activityExerciseSchool =
          translations['PROGRAMACION.exercise_delivery_modality_school']
        this.activityExerciseNone =
          translations['PROGRAMACION.exercise_delivery_modality_none']
        this.activityExerciseQualified =
          translations['EXCERCISE_CARD.exercise_evaluation_noncalificable']
        this.activityExerciseNotQualified =
          translations['EXCERCISE_CARD.exercise_evaluation_calificable']
        this.activityDiversity = translations['PROGRAMACION.activity_diversity']
        this.activityModalityOnline =
          translations[
            'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item1'
          ]
        this.activityModalityPresencial =
          translations[
            'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item2'
          ]
        this.activityModalityBoth =
          translations['PROGRAMACION.activity_modality_item3_output']
        this.activityDesc = translations['PROGRAMACION.activity_description']
      })
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

  identifyLink(text: string): object {
    const textArrays = text.split(' ')
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    const renderArray = []
    textArrays.forEach((item, index) => {
      if (regexp.test(item)) {
        renderArray.push({
          text: item,
          link: item,
          decoration: 'underline',
        })
      } else {
        renderArray.push({
          text:
            (renderArray[index - 1]?.hasOwnProperty('link') ? ' ' : '') +
            item +
            ' ',
        })
      }
    })

    return renderArray
  }

  modalityCheck(type: string): string {
    let modality = ''

    switch (type) {
      case 'PRESENCIAL':
        modality = this.activityModalityOnline.toUpperCase()
        break
      case 'ONLINE':
        modality = this.activityModalityPresencial.toUpperCase()
        break
      case 'MIXTA':
        modality = this.activityModalityBoth.toUpperCase()
        break
    }
    return modality
  }
}
