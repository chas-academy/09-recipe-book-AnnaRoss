import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByTime' })
export class FilterByTimePipe implements PipeTransform {
  transform(recipes: any[], timeLimit) {
    if (!recipes) return [];
    if (timeLimit === 'none' || timeLimit === undefined) return recipes;
    let recipesWithinTimeLimit = recipes.filter(
      recipe => recipe.time <= timeLimit
    );
    return recipesWithinTimeLimit.length > 1
      ? recipesWithinTimeLimit
      : console.log('no recipes matched desired time limit');
  }
}

@Pipe({ name: 'convertSecToMin' })
export class ConvertSecToMinPipe implements PipeTransform {
  transform(seconds: number) {
    return seconds / 60;
  }
}
