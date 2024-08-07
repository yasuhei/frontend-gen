import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IServicoResponse, IStatus } from 'src/app/componentes/models/cliente.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdensService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  buscarServicos(): Observable<IServicoResponse[]> {
    return this.http.get<IServicoResponse[]>(`${this.apiUrl}/ordemServicos`);
  }

  criarServico(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ordemServicos`,body, {observe: 'response'}).pipe(catchError(this.handleError));

  }

  atualizarStatus(body: IStatus): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ordemServicos/atualizar-status`,body, {observe: 'response'}).pipe(catchError(this.handleError));

  }

  deletarUmServico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/ordemServicos/${id}`, {observe: 'response'}).pipe(catchError(this.handleError));
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
