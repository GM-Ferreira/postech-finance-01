export class AuthService {
  public isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  login(setter: (value: boolean) => void): void {
    this.isLoggedIn = true;
    console.log("Usuário logado.");
    setter(this.isLoggedIn);
  }

  logout(setter: (value: boolean) => void): void {
    this.isLoggedIn = false;
    console.log("Usuário deslogado.");
    setter(this.isLoggedIn);
  }
}
