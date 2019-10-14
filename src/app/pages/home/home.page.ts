import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _spinnerServ: SpinnerService, private _authServ: AuthService, private _router: Router) { }

  ngOnInit() { }

  ionViewDidEnter() {
    // console.log('Entré a home, deberia desactivar el spinner');
    this._spinnerServ.hideSpinner();
  }

  public irAChat(chat: string) {
    this._spinnerServ.showSpinner();
    // console.log('Voy al chat para 4°', chat);
    this._router.navigate(['chat-' + chat]);
  }

  public cerrarSesion() {
    this._spinnerServ.showSpinner();

    this._authServ.cerrarSesion().then(() => {
      this._router.navigate(['login']);
      this._spinnerServ.hideSpinner();
    });
  }
}
