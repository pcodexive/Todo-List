export class Todo {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public img: string,
    public status: string,
    public created: string,
    public edited: string,
    public deleted: boolean,
    public owner: number
  ) { }
}
