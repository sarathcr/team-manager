import { Injectable } from '@angular/core'
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { StorageService } from '../storage/storage.service'

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  clientId = environment.googleId
  googleDriveApiAuthUrl = 'https://www.googleapis.com/auth/drive'
  token = new BehaviorSubject('')
  private readonly GOOGLE_TOKEN = 'GOOGLE_TOKEN'
  
  constructor(
    private authService: SocialAuthService,
    private storageService: StorageService
  ) { }

  startSubscribe(isLogout: boolean = false): void {
    this.authService.authState.subscribe((user) => {
      if (user && isLogout) {
        this.authService.signOut()
      }
    })
  }

  googleLogin(): any {
    this.startSubscribe()
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  googleLogout(): void {
    this.startSubscribe(true)
  }

  getGoogleToken(): void {
    this.token.next(this.storageService.getData(this.GOOGLE_TOKEN))
  }

  setGoogleToken(token: string): void {
    this.storageService.setRememberMe()
    this.storageService.setStorageItem(this.GOOGLE_TOKEN, token)
    this.token.next(token)
  }

  onAuthApiLoad(token?: string): void {
    gapi.load('client:auth2', { callback: () => {
      if (!token) {
        gapi.auth.authorize(
          {
            client_id: this.clientId,
            scope: this.googleDriveApiAuthUrl,
          },
          (response) => {
            if (response && !response.error) {
              this.setGoogleToken(response.access_token)
            }
          }
        )
      }
    }})
  }
}
