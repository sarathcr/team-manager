import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { StorageService } from 'src/app/common-shared/services/storage/storage.service'

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private storage: StorageService) {}

  canActivate(): boolean {
    return this.storage.getUserProfile() === 'STUDENT'
  }
}
