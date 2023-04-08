export interface Employee {
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
}

export interface EmployeeWithId extends Employee {
  id: number;
}
