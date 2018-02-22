export class Recipe {
    public id: string;
    public recipeName: string;
    public ingredients: string[];
    public time: number;
    public photoUrl: string;
    
    constructor(
        id: string,
        recipeName: string,
        ingredients: string[],
        time: number,
        photoUrl: string,
    ) {
        this.id = id;
        this.recipeName = recipeName;
        this.ingredients = ingredients;
        this.time = time;
        this.photoUrl = photoUrl;
    }
}