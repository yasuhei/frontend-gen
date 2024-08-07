import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IServicoResponse } from './componentes/models/cliente.models';
import { MatDialog } from '@angular/material/dialog';
import { ClientesComponent } from './componentes/servicosCliente/clientes.component';
import { ListaDeServicosComponent } from './componentes/listarServicos/lista-de-servicos/lista-de-servicos.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  displayedColumns: string[] = [ 'nome', 'email', 'telefone', 'endereco', 'actions', 'detalhes'];
  dataSource: IServicoResponse[] = [];
  statusOptions: string[] = ['ABERTA', 'FINALIZADA', 'CANCELADA'];

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.clienteService.buscarClientes().subscribe((res) => {
      this.dataSource = res.clients || [];
    })
  }

  openDialog(id: string): void {
    this.dialog.open(ClientesComponent, {
      width: '100%',
      maxWidth: '1080px',
      data: {id }
    });
  }

  openDialogDetalhes(id: string): void {
    this.dialog.open(ListaDeServicosComponent, {
      width: '100%',
      data: {id }
    });
  }


}
