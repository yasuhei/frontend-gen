import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client, IClientes, IServicoResponse, IStatus } from 'src/app/componentes/models/cliente.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}


  buscarClientes(): Observable<IClientes> {
    return this.http.get<IClientes>(`${this.apiUrl}/clientes`).pipe(catchError(this.handleError));
  }

  buscarListaDeOrdensDeUnicoCliente(id: string): Observable<IServicoResponse[]> {
    return this.http.get<IServicoResponse[]>(`${this.apiUrl}/ordemServicos/cliente/${id}`).pipe(catchError(this.handleError));
  }

  criarCliente(body: Client): Observable<HttpResponse<Client>> {
    return this.http.post<Client>(`${this.apiUrl}/clientes/criar`, body, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
		let ErrMsg = '';
		if (error instanceof ErrorEvent) {
			ErrMsg = error as any;
		} else {
			ErrMsg =
				`Código do erro: ${error.status}` +
				`  Mensagem do erro: ${error.message}`;
		}
		return throwError(ErrMsg);
	}

}
