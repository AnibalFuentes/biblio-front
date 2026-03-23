export interface Libro {
  id: string;
  titulo: string;
  autor: string;
  apublicacion?: string;
  editorial?: string;
  categoria?: string;
  sede?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LibroCreate {
  titulo: string;
  autor: string;
  apublicacion?: string;
  editorial?: string;
  categoria?: string;
  sede?: string;
}

export interface ApiResponse {
  success: boolean;
  msg?: string;
  libro?: Libro;
  libros?: Libro[];
  errors?: any;
}
