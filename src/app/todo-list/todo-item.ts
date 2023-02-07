
export class TodoItem {
  constructor(
    public description: string,
    public id?: number,
    public iscompleted?: boolean,
    public completedon?: Date,
    public userid?:number
  ) {}
}
