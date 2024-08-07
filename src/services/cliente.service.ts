import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IServicosResponse, IStatus } from 'src/app/componentes/models/cliente.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}


  buscarClientes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clientes`).pipe(catchError(this.handleError));
  }

  buscarListaDeOrdensDeUnicoCliente(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ordemServicos/cliente/${id}`).pipe(catchError(this.handleError));
  }


  criarCliente(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clientes/criar`,body, {observe: 'response'}).pipe(catchError(this.handleError));

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
