export interface Product {
  id: number;
  nome: string;
  preco: number;
  qtd: number;
  created_at: Date;
  updated_at: Date;
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  previous_page_url: null | string;
  next_page_number: number;
  previous_page_number: number;
  totalItemsQtd: number;
}

export interface ValidationFail {
  message: Message;
}

export interface Message {
  errors: Error[];
}

export interface Error {
  rule: string;
  field: string;
  message: string;
  args?: Args;
}

export interface Args {
  start: number;
  stop: null;
}
