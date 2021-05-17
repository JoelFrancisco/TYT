import { IUser } from './IUser';
export class User {
  public name!: string;
  public email!: string;
  public password!: string;

  constructor(props: IUser) {
    Object.assign(this, props);
  }
}
