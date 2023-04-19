import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { query, where, orderBy, limit } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class InvitadosService {

  constructor(private afs: AngularFirestore) { }

  addInvitado(invitado: any) {
    return new Promise((resolve) => {
      var id = this.afs.createId();
      invitado.id = id;
      this.afs.collection('invitados').doc(invitado.id).set(invitado).then(() => {
        resolve(invitado);
      })
    })
  }

  updateInvitado(invitado:any){
    return new Promise((resolve) => {
      this.afs.collection('invitados').doc(invitado.id).update(invitado).then(() => {
        resolve(invitado);
      })
    })
  }

  deleteInvitado(idInvitado:any){
    return new Promise((resolve) => {
      this.afs.collection('invitados').doc(idInvitado).delete().then(() => {
        resolve('Invitado borrado correctamente');
      })
    })
  }

  getListInvitados(){
    return this.afs.collection('invitados')
  }

  getInvitado(id:string){
    return new Promise((resolve)=>{
      this.afs.collection('invitados').doc(id).valueChanges().subscribe(data=>{
        console.log(data);  
        resolve(data);
      })
    })
  }

}
