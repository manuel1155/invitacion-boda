import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AnversoComponent } from './pages/anverso/anverso.component';
import { InvitacionComponent } from './pages/invitacion/invitacion.component';

import { AgGridModule } from 'ag-grid-angular';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../environments/environment';
import { ListaInvitadosComponent } from './pages/lista-invitados/lista-invitados.component';
import { InvitadosFormComponent } from './pages/invitados-form/invitados-form.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccesoInvitadoComponent } from './pages/acceso-invitado/acceso-invitado.component';

@NgModule({
  declarations: [
    AppComponent,
    InvitacionComponent,
    AnversoComponent,
    ListaInvitadosComponent,
    InvitadosFormComponent,
    AccesoInvitadoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'invitacion-front', component: InvitacionComponent},
      {path: 'invitacion-back', component: AnversoComponent},
      {path: 'lista-invitados', component: ListaInvitadosComponent},
      {path: 'invitados-form', component: InvitadosFormComponent},
      {path: '', redirectTo: '/invitacion-front', pathMatch: 'full'},
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AgGridModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
