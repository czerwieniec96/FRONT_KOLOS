import {Roles} from './Role';

export class UserModel {
  email: string;
  name: string;
  password: string;
  role: Roles[];
  userId: number;

}
