import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _username: string;
  public get username(): string {
    return this._username;
  }

  constructor(
    // tslint:disable-next-line: variable-name
    private _auth: AngularFireAuth
  ) {
    this.authState.subscribe((user: firebase.User) => {
      if (user) {
        this._username = user.email;
      }
    });
  }

  public get authState(): Observable<firebase.User> {
    return this._auth.authState;
  }
  public iniciarSesion(credenciales: { correo: string, clave: string }) {
    return this._auth.auth.signInWithEmailAndPassword(credenciales.correo, credenciales.clave)
      .then((user: firebase.auth.UserCredential) => {
        this._username = user.user.email;
        // console.log('Logueo exitoso');
      });
  }

  public cerrarSesion() {
    return this._auth.auth.signOut()
      .then(() => {
        this._username = null;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
