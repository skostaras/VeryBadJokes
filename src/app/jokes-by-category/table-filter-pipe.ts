import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(sortedList: any[]) {
    return sortedList.filter(joke => !joke.hidden)
  }

}