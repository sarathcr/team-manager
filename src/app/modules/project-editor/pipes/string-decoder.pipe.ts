import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stringDecoder'})
export class StringDecoder implements PipeTransform {
  transform(value: string): string {
    return atob(value);
  }
}
