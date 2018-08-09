export class User {
  public id: number;
  public alias: string;
  public listsById: string[];
  private email: string;
  private password: string;

  constructor({ id, alias, email, password, listsById }) {
    this.id = id;
    this.alias = alias;
    this.email = email;
    this.password = password;
    this.listsById = listsById;
  }
}
