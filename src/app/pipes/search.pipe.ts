import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, fields: any[]): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLocaleLowerCase();
    return items.filter( it => {
      for (const field of fields) {
        it = it[field];
      }
      return it.toLocaleLowerCase().includes(searchText);
    });
   }
}
