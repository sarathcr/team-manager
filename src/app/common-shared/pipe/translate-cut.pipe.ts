import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'TranslateCut', pure: false })
export class TranslateCut implements PipeTransform {
  transform(value: string, index: number): string {
    return value?.split('|')[index]
  }
}

@Pipe({ name: 'TranslateOptions', pure: false })
export class TranslateOptions implements PipeTransform {
  transform(value: string, index: number): string {
    return value?.split(/[()]+/)[index]
  }
}

// To replace the string in square bracket
@Pipe({ name: 'TranslateConcat', pure: false })
export class TranslateConcat implements PipeTransform {
  transform(value: string, index: number, newValue: string): string {
    const splittedArray = value.split(/[[\]]/)
    splittedArray[index] = newValue
    return splittedArray.join('')
  }
}
