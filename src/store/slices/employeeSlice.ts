import { axiosInstance } from "@/config/axios";
import { EmployeeWithId } from "@/models/Employee";
import { StateCreator } from "zustand";

export interface EmployeeSlice {
  employees: EmployeeWithId[];
  fetchEmployees: () => Promise<void>;
}

export const createEmployeeSlice: StateCreator<EmployeeSlice> = (set) => ({
  employees: [],
  fetchEmployees: async () => {
    const { data } = await axiosInstance.get<EmployeeWithId[]>("/employee");
    set({ employees: data });
  },
});
