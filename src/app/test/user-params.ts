export class UserParams {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: number,
    public isadmin?: boolean,
  ) {}
}

