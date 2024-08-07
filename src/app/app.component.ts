import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client, IClientes, IServicoResponse } from './componentes/models/cliente.models';
import { MatDialog } from '@angular/material/dialog';
import { ClientesComponent } from './componentes/servicosCliente/clientes.component';
import { ListaDeServicosComponent } from './componentes/listarServicos/lista-de-servicos/lista-de-servicos.component';
import { NovosClientesComponent } from './componentes/novos-clientes/novos-clientes.component';
import { Subscription, throwError } from 'rxjs';
import { ClienteUpdateService } from 'src/utils/cliente-update';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  displayedColumns: string[] = [ 'nome', 'email', 'telefone', 'endereco', 'actions', 'detalhes'];
  dataSource: Client[] = [];
  public subscription : Subscription = new Subscription()

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private clienteUpdateService: ClienteUpdateService,


  ) { }

  ngOnInit() {
    this.loadClientes();

    this.subscription = this.clienteUpdateService.clienteAtualizado$.subscribe(() => {
      this.loadClientes();
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadClientes() {
    this.clienteService.buscarClientes().subscribe({
      next: (response: IClientes) => {
        this.dataSource = response.clients || [];
      },
      error: (error) => {
        this.snackBar.open('Falha ao buscar cliente', 'Fechar', { duration: 2000 });
      }
    });
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
  openDialogNovosClientes(): void {
    this.dialog.open(NovosClientesComponent, {
      width: '100%'
    });
  }


}
