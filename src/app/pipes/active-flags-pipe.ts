import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'activeFlags' })
export class ActiveFlagsPipe implements PipeTransform {

  transform(jokeFlags: any) {

    let allFlags = '';

    Object.keys(jokeFlags).forEach(function (key) {

      if (jokeFlags[key] === true) {
        if (allFlags.length > 0) {
          allFlags = allFlags.concat(', ', key)
        } else {
          allFlags = allFlags.concat(key)
        }
      }

    });

    return allFlags;
  }

}