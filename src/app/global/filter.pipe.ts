import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName1: string, propName2: string = null): any {
    filterString = filterString.toLowerCase().trim();
    if (value.length === 0) return value;
    const result = [];
    let temp;
    for (const item of value) {
      if (propName2 !== null) temp = item[propName2][propName1];
      else temp = item[propName1];
      if (temp.toLowerCase().includes(filterString)) {
        result.push(item);
      }
    }
    return result;
  }

}
