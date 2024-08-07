import { Component, Inject, OnInit } from '@angular/core';
import { IServicoResponse, IStatus } from '../../models/cliente.models';
import { ClienteService } from 'src/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { OrdensService } from 'src/services/ordens.service';

@Component({
  selector: 'app-lista-de-servicos',
  templateUrl: './lista-de-servicos.component.html',
  styleUrls: ['./lista-de-servicos.component.css']
})
export class ListaDeServicosComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'descricao', 'preco', 'dataAbertura', 'dataFinalizacao', 'status',  'delete'];
  dataSource: IServicoResponse[] = [];
  statusOptions: string[] = ['ABERTA', 'FINALIZADA', 'CANCELADA'];

  constructor(
    private ordemService: OrdensService,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },

  ) { }

  ngOnInit() {

    this.clienteService.buscarListaDeOrdensDeUnicoCliente(this.data.id).subscribe({
      next: (res: IServicoResponse[]) => {
        this.dataSource = res;
      },
      error: (error) => {
        console.error('Falha ao buscar ordens de serviço', error);
      }
    });

  }

  updateStatus(id: number, status: string) {
    const body = { id, status };
    this.ordemService.atualizarStatus(body).subscribe((response) => {
      this.snackBar.open(`O campo status foi alterado para ${status}`, 'Fechar', {
        duration: 2000,
      });
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('Erro ao atualizar o status.', 'Fechar', {
        duration: 2000,
      });
      throwError(error)

    });
  }

  deleteElement(id: number) {
    this.dataSource = this.dataSource.filter(service => service.id !== id);
      this.ordemService.deletarUmServico(id).subscribe({
      next: () => {
        this.snackBar.open(`Serviço com ID ${id} excluído`, 'Fechar', {
          duration: 2000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Não foi possível excluir o serviço com ID ${id}.`, 'Fechar', {
          duration: 2000,
        });
        throwError(error)
      }
    });
  }


  editElement({id, status }: IStatus) {
    const body = {
      id, status: "FECHADA"
    }

    this.ordemService.atualizarStatus(body).subscribe((response) => {
      this.snackBar.open(`O campos status foi alterado para ${status}`, 'Fechar', {
        duration: 2000,
      });

    })
  }

}
