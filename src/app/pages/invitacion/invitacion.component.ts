import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const id = queryParams.get('id');
      console.log(id)
    });
  }

  goToBack() {
    this.router.navigate(["invitacion-back"], {
      queryParams: {
        id: "ejemplo",
      },
    });
  }

  goToMapa(){
    
  }



}
