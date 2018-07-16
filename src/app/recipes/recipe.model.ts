export class Recipe {
  public id: string;
  public title: string;
  public ingredients: string[];
  public time: number;
  public photoUrl: string;
  public course: string;

  constructor({
    id,
    recipeName,
    ingredients,
    totalTimeInSeconds,
    imageUrlsBySize,
    attributes
  }) {
    this.id = id;
    this.title = recipeName;
    this.ingredients = ingredients;
    this.time = totalTimeInSeconds;
    this.photoUrl = imageUrlsBySize['90'];
    this.course = attributes['course'][0];
  }
}
