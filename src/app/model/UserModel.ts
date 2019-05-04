import {Roles} from './Role';

export class UserModel {
  email: string;
  name: string;
  password: string;
  roles: Roles[];
  userId: number;
  userResult: number;

}
