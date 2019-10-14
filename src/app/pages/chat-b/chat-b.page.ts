import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Mensaje } from 'src/app/interfaces/mensaje/mensaje';
import { KeylessMensaje } from 'src/app/interfaces/mensaje/KeylessMensaje';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-b',
  templateUrl: './chat-b.page.html',
  styleUrls: ['./chat-b.page.scss'],
})
export class ChatBPage implements OnInit {
  // tslint:disable: variable-name
  public mensajes: Array<Mensaje> = new Array();
  public formGroup: FormGroup;
  private _chatSubB: Subscription;

  constructor(
    protected _spinnerServ: SpinnerService,
    private _authServ: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _chatServ: ChatService,
  ) { }

  ngOnInit() {
    this.inicializarForm();
  }

  public inicializarForm() {
    this.formGroup = this._formBuilder.group({
      mensaje: new FormControl('', [Validators.required, Validators.maxLength(21)])
    });
  }

  public enviarMensaje() {
    const mens: KeylessMensaje = new KeylessMensaje(
      this._authServ.username,
      this.formGroup.value.mensaje,
      (new Date()).getTime(),
    );

    this._chatServ.agregarMensaje('chat_b', mens).then(() => {
      this.formGroup.reset();
    });
  }

  public verificar(mensaje: Mensaje): boolean {
    if (mensaje.usuario === this._authServ.username) { return true; } else {
      return false;
    }
  }

  ionViewWillEnter() {
    // console.log('Voy a entrar');
    this._chatSubB = this._chatServ.obtenerChat('chat_b')
      .subscribe((data: Array<Mensaje>) => {
        this.mensajes = data;
        // console.log(data);
        this._spinnerServ.hideSpinner();
      });
  }

  ionViewDidLeave() {
    this._chatSubB.unsubscribe();
  }

  //#region Transitions
  public cerrarSesion() {
    this._spinnerServ.showSpinner();
    this._authServ.cerrarSesion().then(() => {
      this._router.navigate(['login']);
      this._spinnerServ.hideSpinner();
    });
  }

  public irHome() {
    this._router.navigate(['home']);
  }
  //#endregion
}
