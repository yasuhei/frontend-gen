export interface IServicoResponse {
  id: number;
  descricao: string;
  preco: string;
  dataAbertura: string;
  dataFinalizacao: string;
  status: string;
  clientId: string | null;
}



export interface IServicosRequest {
  id?: number
  descricao: string
  preco: number
  dataAbertura: string
  dataFinalizacao: string
  status: string
  clientId?: string
}
 export interface IStatus {
  id: number
  status: string
 }
 export interface ICriarServico {
  nome: string
  email: string
  telefone: string
  endereco: string

 }
 export interface IClientes {
  clients: Client[];
}

export interface Client {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}
