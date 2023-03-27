import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anverso',
  templateUrl: './anverso.component.html',
  styleUrls: ['./anverso.component.css']
})
export class AnversoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const id = queryParams.get('id');
      console.log(id)
    });
  }

  goToFront() {
    this.router.navigate(["invitacion-front"], {
      queryParams: {
        id: "ejemplo",
      },
    });
  }

  goToUrl(destino:string){
    switch (destino) {
      case 'mesa':
          window.open('https://mesaderegalos.liverpool.com.mx/milistaderegalos/51135121', '_blank');
          break;

      case 'mapa':
          window.open('https://goo.gl/maps/PSDZNeBNj5rcGppY7', '_blank');
          break;

      default:
          break;
  }
  }

}
