import { Injectable } from '@angular/core'
import { StorageKey } from '../../constants/model/storage.model'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  rememberMe = false
  constructor() {}

  setStorageItem(key: StorageKey, value: string): void {
    if (this.rememberMe) {
      localStorage.setItem(key, value)
    } else {
      sessionStorage.setItem(key, value)
    }
  }

  getOrRemoveStorageItem(
    value: StorageKey,
    storageType: 'getItem' | 'removeItem'
  ): void {
    if (this.rememberMe) {
      localStorage[storageType](value)
    } else {
      sessionStorage[storageType](value)
    }
  }

  getData(key: StorageKey): string {
    return localStorage.getItem(key) || sessionStorage.getItem(key)
  }

  setRememberMe(): void {
    this.rememberMe = !!localStorage.getItem('JWT_TOKEN')
  }

  getUserId(): number {
    return JSON.parse(atob(this.getData('JWT_TOKEN').split('.')[1])).userid
  }

  getUserProfile(): 'TEACHER' | 'STUDENT' {
    return JSON.parse(atob(this.getData('JWT_TOKEN').split('.')[1]))?.profile
  }

  // Function to check whether the google token expired or not
  checkGoogleTokenExpired(): boolean {
    let tokenExpiry: any = this.getData('GOOGLE_TOKEN_EXPIRY')
    const token: any = this.getData('GOOGLE_TOKEN')
    const currentTime = new Date().getTime()
    tokenExpiry = tokenExpiry ? (tokenExpiry - 20) * 1000 : tokenExpiry
    if (token && tokenExpiry <= currentTime) {
      return true // It returns true before 20s of the actual expiry.
    }
    return false
  }
}
