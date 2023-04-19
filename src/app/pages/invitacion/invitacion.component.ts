import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitadosService } from 'src/app/shared/invitados/invitados.service';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent implements OnInit {

  done = false;
  invitado: any;
  /* invitados = [
    {
      nombre: 'Cristina',
      celular: ,
      pases: 5,
      confirmado: false,
      pases_confirm: 0,
    },{
      nombre: 'Mario Montiel',
      celular: 4443394108,
      pases: 4,
      confirmado: false,
      pases_confirm: 0,
    },{
      nombre: 'Eva Rodriguez',
      celular: 4445081987,
      pases: 3,
      confirmado: false,
      pases_confirm: 0,
    }
  ] */

  

  constructor(private route: ActivatedRoute, private router: Router, private invServ: InvitadosService) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe(async (queryParams) => {
      var id = queryParams.get('id') as string;
      console.log(id == '')
      if (id == '' || id == undefined) {
        console.log('vacio');
      } else {
        this.invitado = await this.invServ.getInvitado(id);
        if(this.invitado){
          console.log(this.invitado);
          this.done=true;
        }
      }
    });

    /* var resp = null;
    for(let inv of this.invitados){
      resp = await this.invServ.addInvitado(inv);
      console.log(resp);
    } */
  }

  goToBack() {
    this.router.navigate(["invitacion-back"], {
      queryParams: {
        id: this.invitado.id,
      },
    });
  }

}
