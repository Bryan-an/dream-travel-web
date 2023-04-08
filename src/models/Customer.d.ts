export interface Customer {
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
}

export interface CustomerWithId extends Customer {
  id: number;
}
