import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(sortedList: any[]) {

    if (typeof sortedList == 'undefined') {
      return null;
    }
    
    return sortedList.filter(joke => !joke.hidden)
  }

}