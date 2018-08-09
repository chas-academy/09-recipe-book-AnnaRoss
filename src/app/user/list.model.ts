export class List {
  public id: number;
  public title: string;
  public author: string;
  public recipesById: string[];

  constructor({ id, owner, title, itemsById }) {
    this.id = id;
    this.title = title;
    this.author = owner;
    this.recipesById = itemsById;
  }
}
