import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'checkCount', pure: false})
export class CheckCount implements PipeTransform {

  transform(value: any): number {
    return value?.reduce((acc, item) => {
      return acc += item.checked || item.evaluationCriteria?.reduce((sum, criteria) => {
        return sum += criteria.checked
      }, 0) || 0
    }, 0)
  }

}
