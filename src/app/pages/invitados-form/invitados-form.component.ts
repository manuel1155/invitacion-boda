import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { InvitadosService } from 'src/app/shared/invitados/invitados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invitados-form',
  templateUrl: './invitados-form.component.html',
  styleUrls: ['./invitados-form.component.css']
})
export class InvitadosFormComponent implements OnInit {

  invitadoForm!: FormGroup;
  submitted = false;
  invitado: any = null;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invServ: InvitadosService
  ) {
    this.invitadoForm = this.fb.group({
      nombre: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      confirma_con: ['0', Validators.required],
      pases: [0, Validators.required],
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    let celular = this.f['celular'].value + inputChar
    if (celular.length > 10) {
      event.preventDefault();
    }

  }

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
          this.invitadoForm.patchValue({
            nombre: this.invitado.nombre,
            celular: this.invitado.celular,
            confirma_con: this.invitado.confirma_con,
            pases: this.invitado.pases
          })
        }
      }
    });

  }

  get f() { return this.invitadoForm.controls; }

  postInvitado() {
    if (!this.invitado) {
      console.log('crear');
      this.invServ.addInvitado(this.invitadoForm.value).then((invitadoData)=>{
         console.log(invitadoData);
         Swal.fire('Los datos del invitado fueron almacenados correctamente.', '', 'success').then(() => {
           this.invitadoForm.reset();
         })
       })
    } else {
      console.log('actualizar');
      let invData = this.invitadoForm.value;
      invData['id']=this.invitado.id
      this.invServ.updateInvitado(invData).then((invitadoData)=>{
        console.log(invitadoData);
        Swal.fire('Los datos del invitado fueron actualizados correctamente.', '', 'success').then(() => {
          this.invitadoForm.reset();
          this.router.navigate(["lista-invitados"]);
        })
      });
    }
  }

  goToListInv() {
    this.router.navigate(["lista-invitados"]);
  }
}
