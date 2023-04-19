import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitadosService } from 'src/app/shared/invitados/invitados.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-anverso',
  templateUrl: './anverso.component.html',
  styleUrls: ['./anverso.component.css']
})
export class AnversoComponent implements OnInit {

  done = false;
  invitado: any;

  constructor(private route: ActivatedRoute, private router: Router, private invServ: InvitadosService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(async (queryParams) => {
      var id = queryParams.get('id') as string;
      console.log(id == '')
      if (id == '' || id == undefined) {
        console.log('vacio');
      } else {
        this.invitado = await this.invServ.getInvitado(id);
        if (this.invitado) {
          console.log(this.invitado);
          this.done = true;
        }
      }
    });
  }

  goToFront() {
    this.router.navigate(["invitacion-front"], {
      queryParams: {
        id: this.invitado.id,
      },
    });
  }

  goToUrl(destino: string) {
    switch (destino) {
      case 'mesa':
        window.open('https://mesaderegalos.liverpool.com.mx/milistaderegalos/51135121', '_blank');
        break;

      case 'mapa':
        window.open('https://goo.gl/maps/PSDZNeBNj5rcGppY7', '_blank');
        break;

      case 'confirmar':

        var title = ''

        if (this.invitado.pases == 1) title = '¿Te será posible acompañarnos a nuestra boda? Recuerda que tienes ' + this.invitado.pases + ' pase';
        else title = '¿Te será posible acompañarnos a nuestra boda? Recuerda que tienes ' + this.invitado.pases + ' pases'
        Swal.fire({
          title: title,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si, asistire!',
          denyButtonText: `No podre acompañarlos`,
          imageUrl: './../../../assets/pareja-de-boda.png',
          imageAlt: 'Custom image',

        }).then((result) => {
          console.log(this.invitado);
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            this.invitado['confirmado'] = true;
            this.invitado['respuesta_conirmado'] = true,
              this.invitado['fecha_confirma'] = new Date();


            this.invServ.updateInvitado(this.invitado).then(() => {
              Swal.fire('Muchas gracias por confirmar tu asistencia! Te esperamos el día de la boda.', '', 'success').then(() => {
                var cel = '';
                if (this.invitado['confirma_con'] == 'novio') cel = '4442876143';
                else cel = '4444156689';

                let url = "https://api.whatsapp.com/send?phone=" + cel + "&text=Confirmo%20mi%20asistencia%20a%20su%20boda%20";
                console.log(url);
                window.open(url, '_blank');
              })
            })

          } else if (result.isDenied) {

            this.invitado['confirmado'] = true;
            this.invitado['respuesta_conirmado'] = true;
            this.invitado['fecha_confirma'] = new Date();

            this.invServ.updateInvitado(this.invitado).then(() => {
              Swal.fire('Nos entristece que no puedas acompañarnos, gracias por avisar.', '', 'info').then(() => {
                var cel = '';
                if (this.invitado['confirma_con'] == 'novio') cel = '4442876143';
                else cel = '4444156689';
                var cel = '';
                if (this.invitado['confirma_con'] == 'novio') cel = '4442876143';
                else cel = '4444156689';

                let url = "https://api.whatsapp.com/send?phone=" + cel + "&text=No%20me%20será%20posible%20asistir%20a%20su%20boda";
                console.log(url);
                window.open(url, '_blank');
              })
            })
          }
        })
        break;

      default:
        break;
    }
  }

}
