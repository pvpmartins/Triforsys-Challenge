export interface Product {
  meta: Meta
  data: Data[]
}

export interface Data {
  id: number
  nome: string
  preco: string
  qtd: number
  created_at: Date
  updated_at: Date
}

export interface Meta {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: null
  previous_page_url: null
}
