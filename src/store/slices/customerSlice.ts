import { axiosInstance } from "@/config/axios";
import { CustomerWithId } from "@/models/Customer";
import { StateCreator } from "zustand";

export interface CustomerSlice {
  customers: CustomerWithId[];
  fetchCustomers: () => Promise<void>;
}

export const createCustomerSlice: StateCreator<CustomerSlice> = (set) => ({
  customers: [],
  fetchCustomers: async () => {
    const { data } = await axiosInstance.get<CustomerWithId[]>("/customer");
    set({ customers: data });
  },
});
