import { Pipe, PipeTransform } from '@angular/core'
import { Block } from '../constants/model/curriculum.model'

@Pipe({name: 'filterBySubjectId', pure: false})
export class FilterBySubjectId implements PipeTransform {

  transform(values: any, key: number): Block[] {
     return values.filter(value => value.subjectId === key)
  }

}
