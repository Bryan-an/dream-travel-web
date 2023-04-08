import { axiosInstance } from "@/config/axios";
import { CustomerWithId } from "@/models/Customer";
import { EmployeeWithId } from "@/models/Employee";
import { TravelWithId } from "@/models/Travel";
import { StateCreator } from "zustand";

export interface TravelSlice {
  travels: TravelWithId[];
  fetchTravels: () => Promise<void>;
}

export const createTravelSlice: StateCreator<TravelSlice> = (set) => ({
  travels: [],
  fetchTravels: async () => {
    const { data } = await axiosInstance.get<TravelWithId[]>("/travel");

    const completeData = await Promise.all(
      data.map(async (travel) => {
        const { id_cliente, id_empleado } = travel;

        const { data: customer } = await axiosInstance.get<CustomerWithId>(
          `/customer/${id_cliente}`
        );

        const { data: employee } = await axiosInstance.get<EmployeeWithId>(
          `/employee/${id_empleado}`
        );

        return {
          cliente: customer,
          empleado: employee,
          ...travel,
        };
      })
    );

    set({ travels: completeData });
  },
});
