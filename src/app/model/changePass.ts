export class ChangePass {
  email: string;
  newPassword: string;
  oldPassword: string;


  constructor(email: string, oldpass: string , newpass: string)
  {
    this.email = email;
    this.oldPassword = oldpass;
    this.newPassword = newpass;
  }
}
