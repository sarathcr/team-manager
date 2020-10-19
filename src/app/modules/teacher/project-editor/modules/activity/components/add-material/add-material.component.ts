import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { PDFDocumentProxy } from 'pdfjs-dist'
import { map } from 'rxjs/operators'
import { GoogleCardVariant } from 'src/app/common-shared/constants/model/google-card.model'
import { DriveFile } from 'src/app/common-shared/constants/model/google-drive.model'
import { GoogleAuthService } from 'src/app/common-shared/services/google/google-auth.service'
import { GoogleFileService } from 'src/app/common-shared/services/google/google-file.service'
import { getDriveMimeFileType } from 'src/app/common-shared/utility/file.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import {
  entityType,
  StatusMaterial,
} from '../../../../constants/model/activity.model'
import { DriveFileEntityService } from '../../../../store/entity/drive-file/drive-file-entity.service'

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnDestroy, OnInit {
  @Input() referenceMaterial: StatusMaterial = {
    fileId: '',
    status: 'default',
    fileType: 'DOCUMENT',
    previewImageUrl: '',
    sourceType: 'GOOGLEDRIVE',
    title: '',
    url: '',
    visible: true,
    callConfirm: false,
  }
  @Input() activeMaterialTab = 0
  @Input() currentMaterialView = 1
  @Input() entityType: entityType
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
  files: DriveFile[]
  filesLoading = false
  subscriptions = new SubSink()
  googleSubscriptions = new SubSink()
  selectedMaterial: DriveFile
  selectedType: GoogleCardVariant
  googleToken: string
  cloneLoading = false
  creationLoading = false
  iframeLoading = false

  constructor(
    private driveFileService: DriveFileEntityService,
    private googleFileService: GoogleFileService,
    private googleAuthService: GoogleAuthService
  ) {
    this.googleAuthService.getGoogleToken() // Get google token
    this.subscriptions.sink = this.googleAuthService.token.subscribe(
      (token) => (this.googleToken = token)
    )
  }

  ngOnInit(): void {
    if (this.entityType !== 'instrument') {
      // To add 4th tab for materials popup
      this.addMaterialTabs.push('ADD_MATERIAL.material_add_googledrive')
    }
  }

  ngOnDestroy(): void {
    this.resetTabs.emit()
  }

  onDecline(event: string): void {
    this.declineModal.emit(event)
  }

  // To save reference material
  onConfirm(): void {
    this.confirmModal.emit(this.referenceMaterial)
  }

  getActiveTab(tabNumber: number): void {
    this.setActiveTab.emit(tabNumber)
  }

  // For getting files from backend on view change
  changeView(variant: GoogleCardVariant): void {
    this.files = []
    const query = `${this.entityType}/${variant}`
    this.selectedType = variant
    this.subscriptions.sink = this.driveFileService.loading$.subscribe(
      (loading) => (this.filesLoading = loading)
    )
    this.driveFileService.entities$
      .pipe(map((files) => files.find((fileData) => fileData.id === query)))
      .subscribe((files) => {
        if (!files) {
          this.driveFileService.getByKey(query)
        } else {
          this.files = files.fileList
        }
      })
    this.nextModal()
  }

  previousModal(): void {
    this.previousMaterialView.emit()
    if (this.selectedMaterial) {
      this.selectedMaterial = null
      this.iframeLoading = false
    }
  }

  nextModal(file?: DriveFile): void {
    if (file) {
      this.iframeLoading = true
      this.selectedMaterial = file
    }
    if (this.currentMaterialView === 1) {
      this.googleAuthService.onAuthApiLoad(this.googleToken) // to authenticate user on view change
    }
    this.nextMaterialView.emit()
  }

  // To stop iframe loading
  onLoadComplete(): void {
    this.iframeLoading = false
  }

  getMaterialDetails(
    referenceMaterial: StatusMaterial,
    callConfirm?: boolean
  ): void {
    this.setModalDetails.emit({ ...referenceMaterial, callConfirm })
  }

  // To clone file from thinko drive to users drive
  handleClone(): void {
    this.cloneLoading = true
    this.googleSubscriptions.sink = this.googleFileService
      .cloneFile(
        { id: this.selectedMaterial.id, title: this.selectedMaterial.name },
        this.googleToken
      )
      .subscribe(
        (response) => {
          this.cloneLoading = false
          this.referenceMaterial = {
            fileId: response.id,
            status: 'success',
            fileType: this.selectedType,
            previewImageUrl: '',
            sourceType: 'GOOGLEDRIVE',
            title: response.title,
            url: response.alternateLink,
            visible: true,
          }
        },
        (err) => {
          if (err.status === 401) {
            this.googleAuthService // user authentication error 401
              .onAuthApiLoad()
              .then(() => this.handleClone())
          }
          this.cloneLoading = false
        },
        () => {
          window.open(this.referenceMaterial.url, '_blank') // To open in new tab
          this.getMaterialDetails(this.referenceMaterial, true)
          this.googleSubscriptions.unsubscribe()
        }
      )
  }

  // To create new file in users drive
  createDriveFile(): void {
    this.creationLoading = true
    this.googleSubscriptions.sink = this.googleFileService
      .createFile(
        {
          mimeType: getDriveMimeFileType(this.selectedType), // mimetype
          title: `NEW ${this.selectedType}`, // file name
        },
        this.googleToken
      )
      .subscribe(
        (response) => {
          this.creationLoading = false
          this.referenceMaterial = {
            fileId: response.id,
            status: 'success',
            fileType: this.selectedType,
            previewImageUrl: '',
            sourceType: 'GOOGLEDRIVE',
            title: response.title,
            url: response.alternateLink,
            visible: true,
          }
        },
        (err) => {
          if (err.status === 401) {
            this.googleAuthService // user authentication error 401
              .onAuthApiLoad()
              .then(() => this.createDriveFile())
          }
          this.creationLoading = false
        },
        () => {
          window.open(this.referenceMaterial.url, '_blank') // To open in new tab
          this.getMaterialDetails(this.referenceMaterial, true)
          this.googleSubscriptions.unsubscribe()
        }
      )
  }
}
