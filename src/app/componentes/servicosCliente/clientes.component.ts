import { Component,  Inject,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/services/cliente.service';
import { OrdensService } from 'src/services/ordens.service';

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
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      dataAbertura: ['', Validators.required],
      dataFinalizacao: ['', Validators.required],
      status: ['', Validators.required],

    });
  }


  onSubmit(): void {
    if (this.userForm.valid) {
      const body = {
        descricao: this.userForm.controls['descricao'].value,
        preco: this.userForm.controls['preco'].value,
        dataAbertura: this.userForm.controls['dataAbertura'].value,
        dataFinalizacao: this.userForm.controls['dataFinalizacao'].value,
        status: this.userForm.controls['status'].value,
        clientId: this.data.id
      }
      this.ordemService.criarServico(body).subscribe((response) => {
        if(response) {
          this.dialogRef.close();

        }
      })
    } else {
      this.snackBar.open(`Erro ao criar o serviço `, 'Fechar', {
        duration: 2000,
      });
    }
  }
}

