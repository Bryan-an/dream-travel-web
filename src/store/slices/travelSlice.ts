import { axiosInstance } from "@/config/axios";
import { CustomerWithId } from "@/models/Customer";
import { EmployeeWithId } from "@/models/Employee";
import { Travel, TravelWithId } from "@/models/Travel";
import { StateCreator } from "zustand";

export interface TravelSlice {
  travels: TravelWithId[];
  fetchTravels: () => Promise<void>;
  addTravel: (travel: Travel) => Promise<void>;
  deleteTravel: (id: TravelWithId["id"]) => Promise<void>;
  editTravel: (id: TravelWithId["id"], employee: Travel) => Promise<void>;
}

export const createTravelSlice: StateCreator<TravelSlice> = (set, get) => ({
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

  addTravel: async (travel) => {
    await axiosInstance.post("/travel", travel);
    get().fetchTravels();
  },

  deleteTravel: async (id) => {
    const newTravels = get().travels.filter((travel) => travel.id !== id);
    set({ travels: newTravels });
    await axiosInstance.delete(`/travel/${id}`);
  },

  editTravel: async (id, travel) => {
    const newTravels = get().travels.map((item) => {
      if (item.id === id) {
        return {
          ...travel,
          id,
        };
      }

      return item;
    });

    set({ travels: newTravels });

    await axiosInstance.put(`/travel/${id}`, travel);
  },
});
