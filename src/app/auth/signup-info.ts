export class SignUpInfo {
  name: string;
  email: string;
  role: string[];
  password: string;
  username: string;

  constructor(name: string, email: string, password: string, username: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = ['user'];
    this.username = '123';
  }
  constructor1( email: string, role: string) {
    this.email = email;
    this.role = role;
  }
}
