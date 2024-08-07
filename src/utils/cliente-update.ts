import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteUpdateService {
  private clienteAtualizado = new Subject<void>();

  clienteAtualizado$ = this.clienteAtualizado.asObservable();

  emitirAtualizacao() {
    this.clienteAtualizado.next();
  }
}
