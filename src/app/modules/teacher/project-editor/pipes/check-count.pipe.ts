import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'checkCount', pure: false })
export class CheckCount implements PipeTransform {
  transform(value: any, key: string = ''): number {
    return value?.reduce((acc, item) => {
      acc +=
        item.checked ||
        item[key]?.reduce((sum, element) => {
          sum += element.checked
          return sum
        }, 0) ||
        0
      return acc
    }, 0)
  }
}
