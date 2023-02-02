
export class TodoItem {
  constructor(
    public description: string,
    public id?: number,
    public isCompleted?: boolean,
    public completedOn?: Date,
    public userid?:number
  ) {}
}
