import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    filterString = filterString.toLowerCase().trim();
    if (value.length === 0) return value;
    const result = [];
    for (const item of value) {
      if (item[propName].includes(filterString)) {
        result.push(item);
      }
    }
    return result;
  }

}
