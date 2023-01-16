import { Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'sortDate',
})
export class SortDatePipe implements PipeTransform {
  transform(list: any[], sortOrder: SortOrder = 'asc'): any[] {
    list.sort((a: any, b: any) => {
      if (a[0]['timestamp'] < b[0]['timestamp']) return 1;
      else if (a[0]['timestamp'] > b[0]['timestamp']) return -1;
      else return 0;
    });
    return sortOrder === 'asc' ? list : list.reverse();
  }
}
