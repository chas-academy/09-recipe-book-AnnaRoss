import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByTime' })
export class FilterByTimePipe implements PipeTransform {
  transform(recipes: any[], timeLimit: number = 100000000) {
    if (!recipes) return [];
    return recipes.filter(recipe => recipe.time <= timeLimit);
  }
}

@Pipe({ name: 'convertSecToMin' })
export class ConvertSecToMinPipe implements PipeTransform {
  transform(seconds: number) {
    return seconds / 60;
  }
}
