import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'minutesToHour',
})
export class MinutesToHours implements PipeTransform {
  transform(value: string, onlyHour: boolean = false): string {
    let hours = ''
    if (value !== undefined) {
      if (onlyHour) {
        hours = '' + Math.round(+value / 60)
      } else {
        const hour = Math.trunc(+value / 60)
        const minutes = +value % 60
        hours =
          hour > 0
            ? hour + (minutes > 0 ? ':' + minutes : '')
            : minutes > 0
            ? '0:' + minutes
            : '0'
      }
    } else {
      hours = '0'
    }
    return hours
  }
}
