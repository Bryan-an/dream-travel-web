import { CustomerWithId } from "./Customer";
import { EmployeeWithId } from "./Employee";

export interface TravelResponse {
  destino?: string;
  fecha_salida?: string;
  fecha_regreso?: string;
  precio?: number;
  id_cliente?: number;
  id_empleado?: number;
}

export interface Travel extends TravelResponse {
  cliente?: CustomerWithId;
  empleado?: EmployeeWithId;
}

export interface TravelWithId extends Travel {
  id: number;
}
