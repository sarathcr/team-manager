import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { ReferenceMaterials } from 'src/app/modules/project-editor/constants/model/activity.model'
import { GoogleAuthService } from 'src/app/shared/services/google/google-auth.service'
import { StorageService } from 'src/app/shared/services/storage/storage.service'
import { getFileType } from 'src/app/shared/utility/file.utility'
import { environment } from '../../../../../../../environments/environment.dev'
import { SubSink } from '../../../../../../shared/utility/subsink.utility'

@Injectable({
  providedIn: 'root',
})
export class PickerService {
  pickerApiLoaded = false
  oauthToken: string
  picker: google.picker.Picker
  subscriptions = new SubSink()
  private fileSelected: BehaviorSubject<any> = new BehaviorSubject<object>({})
  public fileSelected$: Observable<
    ReferenceMaterials
  > = this.fileSelected.asObservable()

  private isPickerVisible: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false)
  public isPickerVisible$: Observable<
    boolean
  > = this.isPickerVisible.asObservable()

  constructor(
    private googleAuthService: GoogleAuthService,
    private storageService: StorageService
  ) {}

  initPicker(): void {
    this.googleAuthService.getGoogleToken()
    this.subscriptions.sink = this.googleAuthService.token.subscribe(
      (token) => {
        if (token) {
          this.oauthToken = token
          this.createPicker()
        }
      }
    )
  }

  onApiLoad(): void {
    this.googleAuthService
      .onAuthApiLoad(this.oauthToken)
      .then(() =>
        gapi.load('picker', { callback: () => this.onPickerApiLoad() })
      )
  }

  onPickerApiLoad(): void {
    this.pickerApiLoaded = true
    this.createPicker()
  }

  createPicker(): void {
    if (this.pickerApiLoaded && this.oauthToken) {
      // WIP change locale to  this.translateService.currentLang
      this.picker = new google.picker.PickerBuilder()
        .setLocale('es')
        .hideTitleBar()
        .addView(
          new google.picker.DocsView()
            .setIncludeFolders(true)
            .setParent('root')
            .setOwnedByMe()
        )
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .setOAuthToken(this.oauthToken)
        .setDeveloperKey(environment.googleAPIKey)
        .setCallback((data) => this.pickerCallback(data, this))
        .build()
      this.picker.setVisible(true)
    }
  }

  pickerCallback(data: any, scope: any): void {
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      const doc = data[google.picker.Response.DOCUMENTS][0]
      doc.thumbnail =
        'https://lh3.googleusercontent.com/d/' +
        doc.id +
        '=w200-h150-p-k-nu?access_token=' +
        this.oauthToken
      getFileType(doc.mimeType).then((fileType) => {
        scope.fileSelected.next({
          url: doc.url,
          previewImageUrl: doc.thumbnail,
          fileType: fileType || 'WEB',
          title: doc.name,
          fileName: doc.name,
          sourceType: 'GOOGLEDRIVE',
          visible: true,
        })
      })
    } else if (data.action === 'loaded') {
      this.isPickerVisible.next(true)
    } else if (data.action === 'cancel') {
      this.isPickerVisible.next(false)
      this.cleanData()
    }
  }

  cleanData(): void {
    if (this.picker) {
      this.picker.setVisible(false)
      this.subscriptions.unsubscribe()
    }
  }
}
