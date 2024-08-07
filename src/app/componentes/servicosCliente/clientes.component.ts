import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdensService } from 'src/services/ordens.service';
import { IServicosRequest } from '../models/cliente.models';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  userForm!: FormGroup;
  statusOptions: string[] = ['ABERTA', 'FINALIZADA', 'CANCELADA'];

  constructor(
    private fb: FormBuilder,
    private ordemService: OrdensService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<any>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      preco: ['', Validators.required],
      dataAbertura: ['', Validators.required],
      dataFinalizacao: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  formatDateToISO(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const body: IServicosRequest = {
        descricao: this.userForm.controls['descricao'].value,
        preco: this.userForm.controls['preco'].value,
        dataAbertura: this.formatDateToISO(this.userForm.controls['dataAbertura'].value),
        dataFinalizacao: this.formatDateToISO(this.userForm.controls['dataFinalizacao'].value),
        status: this.userForm.controls['status'].value,
        clientId: this.data.id
      }

      this.ordemService.criarServico(body).subscribe({
        next: (response) => {
          if (response) {
            this.dialogRef.close();
            this.snackBar.open('Serviço criado com sucesso', 'Fechar', {
              duration: 2000,
            });
          }
        },
        error: (error) => {
          console.error('Erro ao criar o serviço', error);
          this.snackBar.open('Falha ao criar o serviço', 'Fechar', {
            duration: 2000,
          });
        }
      });
    } else {
      this.snackBar.open('Erro ao criar o serviço. Verifique os dados e tente novamente.', 'Fechar', {
        duration: 2000,
      });
    }
  }
}
