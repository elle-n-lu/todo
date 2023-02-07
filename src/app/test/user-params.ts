export class UserParams {
  constructor(
    public name: string,
    public password: string,
    public email?: string,
    public id?: number,
    public isadmin?: boolean,
  ) {}
}


