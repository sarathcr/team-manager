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

  getUserId(): string {
    return JSON.parse(atob(this.getData('JWT_TOKEN').split('.')[1])).userid
  }
}
