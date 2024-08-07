import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/services/cliente.service';
import { ClienteUpdateService } from 'src/utils/cliente-update';

@Component({
  selector: 'app-novos-clientes',
  templateUrl: './novos-clientes.component.html',
  styleUrls: ['./novos-clientes.component.scss']
})
export class NovosClientesComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<any>,
    private clienteUpdateService: ClienteUpdateService,


  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      endereco: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const body = {
        nome: this.userForm.controls['nome'].value,
        email: this.userForm.controls['email'].value,
        telefone: this.userForm.controls['telefone'].value,
        endereco: this.userForm.controls['endereco'].value,
      }

      this.clienteService.criarCliente(body).subscribe({
        next: (response) => {
          if(response) {
            this.clienteUpdateService.emitirAtualizacao();
            this.snackBar.open('Cliente criado com sucesso', 'Fechar', {
              duration: 2000,
            });
            this.dialogRef.close();
          }

        },
        error: (error) => {
          this.snackBar.open('Falha ao criar cliente', 'Fechar', {
            duration: 2000,
          });
        }
      });
    }
  }

}
