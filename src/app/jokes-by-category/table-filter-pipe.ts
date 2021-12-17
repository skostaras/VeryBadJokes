import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(sortedList: any[], value: string) {

    console.log("goodbye");
    console.log(value);
    
    
    // return value ? sortedList.filter(item => item.flags === value) : sortedList;
    return sortedList;
  }

}