import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'groupByThree'
})
export class GroupByThreePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    value = value.toString();
    value = value.split('').reverse().join('');
    let temp = '';
    for (let i = 1; i <= value.length; i++) {
      temp += value[i - 1];
      if (i % 3 === 0) {
        temp += ' ';
      }
    }
    return temp.split('').reverse().join('');
  }

}
