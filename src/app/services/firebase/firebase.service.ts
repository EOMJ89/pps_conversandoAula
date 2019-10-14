import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // tslint:disable-next-line: variable-name
  constructor(private _firestore: AngularFirestore) { }

  public obtenerRegistros(db: string) {
    return this._firestore.collection(db).snapshotChanges();
  }

  public agregarRegistro(db: string, reg) {
    return this._firestore.collection(db).add(reg);
  }
}
