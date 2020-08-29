import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'TranslateCut', pure: false })
export class TranslateCut implements PipeTransform {
  transform(value: string, index: number): string {
    return value.split('|')[index]
  }
}

@Pipe({ name: 'TranslateOptions', pure: false })
export class TranslateOptions implements PipeTransform {
  transform(value: string, index: number): string {
    return value.split(/[()]+/)[index]
  }
}
