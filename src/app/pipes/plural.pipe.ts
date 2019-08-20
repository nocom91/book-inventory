import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(value: number): string {
    if (value > 1) return `${value} items`;
    if (value === 1) return `${value} item`;
    if (value < 1) return ' - ';
  }

}
