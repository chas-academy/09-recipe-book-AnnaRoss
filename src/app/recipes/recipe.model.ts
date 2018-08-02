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
    this.course = attributes['course'] ? attributes['course'][0] : 'N/A';
  }
}

export class RecipeDetail {
  public id: string;
  public title: string;
  public ingredients: string[];
  public time: number;
  public photoUrl: string;
  public course: string;
  public originalSourceName: string;
  public originalSourceRecipeUrl: string;
  public originalSourceSiteUrl: string;

  constructor({
    id,
    name,
    ingredientLines,
    totalTimeInSeconds,
    source,
    images,
    attributes
  }) {
    this.id = id;
    this.title = name;
    this.ingredients = ingredientLines;
    this.time = totalTimeInSeconds;
    this.photoUrl = images['0'].imageUrlsBySize[360];
    this.course = attributes['course'] ? attributes['course'][0] : 'N/A';
    this.originalSourceRecipeUrl = source.sourceRecipeUrl;
    this.originalSourceName = source.sourceDisplayName;
    this.originalSourceSiteUrl = source.sourceSiteUrl;
  }
}
