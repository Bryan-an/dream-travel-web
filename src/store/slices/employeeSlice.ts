import { axiosInstance } from "@/config/axios";
import { Employee, EmployeeWithId } from "@/models/Employee";
import { StateCreator } from "zustand";

export interface EmployeeSlice {
  employees: EmployeeWithId[];
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Employee) => Promise<void>;
  deleteEmployee: (id: EmployeeWithId["id"]) => Promise<void>;
  editEmployee: (id: EmployeeWithId["id"], employee: Employee) => Promise<void>;
}

export const createEmployeeSlice: StateCreator<EmployeeSlice> = (set, get) => ({
  employees: [],
  fetchEmployees: async () => {
    const { data } = await axiosInstance.get<EmployeeWithId[]>("/employee");
    set({ employees: data });
  },
  addEmployee: async (employee) => {
    await axiosInstance.post("/employee", employee);
    get().fetchEmployees();
  },
  deleteEmployee: async (id) => {
    const newEmployees = get().employees.filter(
      (employee) => employee.id !== id
    );
    set({ employees: newEmployees });
    await axiosInstance.delete(`/employee/${id}`);
  },

  editEmployee: async (id, employee) => {
    const newEmployees = get().employees.map((item) => {
      if (item.id === id) {
        return {
          ...employee,
          id,
        };
      }

      return item;
    });

    set({ employees: newEmployees });

    await axiosInstance.put(`/employee/${id}`, employee);
  },
});
