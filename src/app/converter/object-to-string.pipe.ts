import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToString'
})
export class ObjectToStringPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return JSON.parse;
  }

}
