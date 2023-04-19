import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { InvitadosService } from 'src/app/shared/invitados/invitados.service';
import * as moment from 'moment'

@Component({
  selector: 'app-lista-invitados',
  templateUrl: './lista-invitados.component.html',
  styleUrls: ['./lista-invitados.component.css']
})
export class ListaInvitadosComponent implements OnInit {

  public columnDefs: ColDef[] = [
    {
      headerName: 'No.',
      field: 'item',
      width: 70,
      filter: "agNumberColumnFilter", pinned: 'left',
      sortable: true
    },
    {
      headerName: 'Nombre Completo',
      field: 'nombre',
      width: 250,
      sort: 'asc',
      filter: "agTextColumnFilter", pinned: 'left',
      sortable: true
    },
    {
      headerName: 'Celular',
      field: 'celular',
      width: 150,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Pases',
      field: 'pases',
      width: 120,
      filter: "agNumberColumnFilter"
    },
    {
      headerName: 'Confirmar con',
      field: 'confirma_con',
      width: 150,
      filter: "agTextColumnFilter",
      sortable: true,
      cellRenderer: (params: any) => {
        var div = document.createElement('div');
        let icon =''
        if(params.data.confirma_con=='novio') icon ='./../../../assets/novio.png';
        else icon ='./../../../assets/novia.png';
        div.innerHTML = '<center><img src="'+icon+'" width="30"></center>';
        return div;
      }
    },
    {
      headerName: 'Invitación',
      field: 'confirmado',
      width: 200,
      filter: "agTextColumnFilter",
      cellRenderer: (params: any) => {
        var div = document.createElement('div');
        div.innerHTML = '<span class="btn" style="color: #FFFFFF; background-color: #80C657"> Enviar invitación</span>';
        return div;
      }
    }, {
      headerName: 'Fecha enviado',
      field: 'fecha_envio',
      filter: 'agDateColumnFilter',
      sortable: true,
      // add extra parameters for the date filter
      cellRenderer: (data: any) => {
        if (data.value) return this.datepipe.transform(data.value.seconds * 1000, 'dd/MM/yyyy HH:mm')
        else return "Sin enviar"
      },
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {

          var val = moment(cellValue.seconds * 1000).format('YYYY/MM/DD');
          var cellDate = new Date(val);
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;

        }
      }
    },
    {
      headerName: 'Confirmado?',
      field: 'confirmado',
      width: 150,
      filter: "agTextColumnFilter",
      cellRenderer: (params: any) => {
        if (params.data.confirmado) {
          var div = document.createElement('div');
          div.innerHTML = '<span class="badge" style="background-color: #3CA201"> Si </span>';
          return div;
        } else {
          var div = document.createElement('div');
          div.innerHTML = '<span class="badge" style="background-color: #F62E04"> No </span>';
          return div;
        }

      }
    },
    {
      headerName: 'Fecha confirmación',
      field: 'fecha_confirma',
      filter: 'agDateColumnFilter',
      sortable: true,
      // add extra parameters for the date filter
      cellRenderer: (data: any) => {
        if (data.value) return this.datepipe.transform(data.value.seconds * 1000, 'dd/MM/yyyy HH:mm')
        else return 'Sin confirmar'
      },
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {

          var val = moment(cellValue.seconds * 1000).format('YYYY/MM/DD');
          var cellDate = new Date(val);
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        }
      }
    }, {
      headerName: 'Editar',
      field: 'fecha_confirma',
      cellRenderer: (data: any) => {
        return "<button class='btn btn-primary'>Editar</button>"
      },
    }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  tablaInvitados!: GridOptions;
  invitadosList: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invServ: InvitadosService,
    public datepipe: DatePipe) {
    this.tablaInvitados = <GridOptions>{
      columnDefs: this.columnDefs,
      rowData: null,
      onGridReady: () => {
        if (this.tablaInvitados.api) {
          this.tablaInvitados.api.setRowData(this.invitadosList)
          this.tablaInvitados.paginationPageSize = 5;
        }

      }
    }
  }

  async ngOnInit(): Promise<void> {

    await new Promise<void>(resolve => {
      this.invServ.getListInvitados().valueChanges().subscribe(invitados => {

        invitados.sort((a: any, b: any) => {

          let fa = a['nombre'].toLowerCase();
          let fb = b['nombre'].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        this.invitadosList = invitados;

        let i = 0;
        for (let inv of this.invitadosList) {
          i++;
          inv['item'] = i;
        }

        console.log('invitados', this.invitadosList)
        if (this.tablaInvitados.api) this.tablaInvitados.api.setRowData(this.invitadosList);
      })
    })
  }

  onCellClicked(e: CellClickedEvent): void {

    if (e.colDef['headerName'] == 'Invitación') {
      let inv = e.data;
      console.log('watsapp link');
      let url = "https://api.whatsapp.com/send?phone=" + e.data['celular'] + "&text=Se%20acerca%20nuestra%20boda%20y%20nos%20gustar%C3%ADa%20que%20nos%20acompa%C3%B1aras,%20te%20dejo%20la%20invitaci%C3%B3n:%20https://boda-israel.web.app/invitacion-front?id=" + e.data['id'];
      console.log(url);
      inv['fecha_envio'] = new Date();

      this.invServ.updateInvitado(inv).then(() => {
        window.open(url, '_blank');
      })

    }else if (e.colDef['headerName'] == 'Editar') {
      this.router.navigate(["invitados-form"], {
        queryParams: {
          id: e.data.id,
        },
      });
    }
  }

  goToAddInv() {
    this.router.navigate(["invitados-form"]);
  }

}
