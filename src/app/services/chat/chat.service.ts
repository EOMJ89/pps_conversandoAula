import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { map } from 'rxjs/operators';
import { Mensaje } from 'src/app/interfaces/mensaje/mensaje';
import { KeylessMensaje } from 'src/app/interfaces/mensaje/KeylessMensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // tslint:disable-next-line: variable-name
  constructor(private _firebaseServ: FirebaseService) { }

  public obtenerChat(chat: string) {
    return this._firebaseServ.obtenerRegistros(chat).pipe(map((chatItems) => {
      const auxChat = chatItems.map((a) => {
        const data = a.payload.doc.data() as Mensaje;
        data.key = a.payload.doc.id;
        return data;
      });

      return auxChat.sort(this.ordenarFechas);
    }));
  }

  public agregarMensaje(chat: string, mensaje: KeylessMensaje) {
    return this._firebaseServ.agregarRegistro(chat, mensaje.toJson())
      .then(() => {
        // console.log('Mensaje enviado a', chat);
      })
      .catch(err => {
        console.log(err);
      });
  }

  private ordenarFechas(a: Mensaje, b: Mensaje) {
    // tslint:disable-next-line: triple-equals
    if (a.fecha == b.fecha) {
      return 0;
    } else if (a.fecha < b.fecha) {
      return -1;
    } else {
      return 1;
    }
  }
}
