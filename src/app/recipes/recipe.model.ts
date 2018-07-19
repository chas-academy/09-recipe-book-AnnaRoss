export class Recipe {
  public id: string;
  public title: string;
  public time: number;
  public photoUrl: string;
  public course: string;

  constructor({
    id,
    recipeName,
    totalTimeInSeconds,
    imageUrlsBySize,
    attributes
  }) {
    this.id = id;
    this.title = recipeName;
    this.time = totalTimeInSeconds;
    this.photoUrl = imageUrlsBySize['90'];
    this.course = attributes['course'][0];
  }
}

export class RecipeDetail {
  public id: string;
  public title: string;
  public ingredients: string[];
  public time: number;
  public photoUrl: string;
  public course: string;

  constructor({
    id,
    name,
    ingredientLines,
    totalTimeInSeconds,
    sourceRecipeUrl,
    images,
    attributes
  }) {
    this.id = id;
    this.title = name;
    this.ingredients = ingredientLines;
    this.time = totalTimeInSeconds;
    this.photoUrl = images['0'].imageUrlsBySize[360];
    this.course = attributes['course'][0];
  }
}
