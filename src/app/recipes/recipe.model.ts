export class Recipe {
  public id: string;
  public title: string;
  public time: number;
  public photoUrls = {
    small: undefined,
    large: undefined
  };
  public course: string;
  public ingredients: string[];
  public favourite: boolean;
  public originalSourceName: string = 'N/A';
  public originalSourceRecipeUrl: string = 'N/A';
  public originalSourceSiteUrl: string = 'N/A';

  constructor({
    id,
    attributes,
    recipeName,
    name,
    totalTimeInSeconds,
    images,
    imageUrlsBySize,
    source,
    ingredientLines,
    ingredients,
    favourite = false
  }) {
    this.id = id;
    this.ingredients = ingredientLines || ingredients;
    this.title = recipeName || name;
    this.time = totalTimeInSeconds;
    this.course = attributes['course'] && attributes['course'][0];

    this.photoUrls.small = imageUrlsBySize && imageUrlsBySize['90'];
    this.photoUrls.large = images && images['0'].imageUrlsBySize[360];

    this.originalSourceRecipeUrl = source && source.sourceRecipeUrl;
    this.originalSourceName =
      source && source.sourceDisplayName && source.sourceDisplayName;
    this.originalSourceSiteUrl =
      source && source.sourceSiteUrl && source.sourceSiteUrl;
    this.favourite = favourite;
  }
}
