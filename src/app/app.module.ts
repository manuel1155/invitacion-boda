import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnversoComponent } from './pages/anverso/anverso.component';
import { InvitacionComponent } from './pages/invitacion/invitacion.component';

@NgModule({
  declarations: [
    AppComponent,
    InvitacionComponent,
    AnversoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'invitacion-front', component: InvitacionComponent},
      {path: 'invitacion-back', component: AnversoComponent},
      {path: '', redirectTo: '/invitacion-front', pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
