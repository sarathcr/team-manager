import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'FileName', pure: false })
export class FileName implements PipeTransform {
  transform(value: string, type: string): string {
    if (type === 'LOCALDRIVE') {
      const divide = value.search('-')
      return value.slice(divide + 1, value.length)
    } else {
      return value
    }
  }
}
