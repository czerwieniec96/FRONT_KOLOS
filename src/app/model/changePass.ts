export class ChangePass {
  email: string;
  oldpass: string;
  newpass: string;

  constructor(email: string, oldpass: string , newpass: string)
  {
    this.email = email;
    this.oldpass = oldpass;
    this.newpass = newpass;
  }
}
