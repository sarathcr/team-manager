import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'checkCount', pure: false})
export class CheckCount implements PipeTransform {

  transform(value: any): number {
    return value?.reduce((acc, item) => {
      acc += item.checked || item.evaluationCriteria?.reduce((sum, criteria) => {
          sum += criteria.checked
          return sum
        }, 0) || 0
      return acc
    }, 0)
  }

}
