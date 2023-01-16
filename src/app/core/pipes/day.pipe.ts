import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(timestamp: string): string | null {
    if (timestamp === null) {
      return null;
    }

    var day = new Date(timestamp).getDay(),
      dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

    return dayNames[day];
  }
}
