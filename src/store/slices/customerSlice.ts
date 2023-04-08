import { axiosInstance } from "@/config/axios";
import { Customer, CustomerWithId } from "@/models/Customer";
import { StateCreator } from "zustand";

export interface CustomerSlice {
  customers: CustomerWithId[];
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Customer) => Promise<void>;
}

export const createCustomerSlice: StateCreator<CustomerSlice> = (set, get) => ({
  customers: [],
  fetchCustomers: async () => {
    const { data } = await axiosInstance.get<CustomerWithId[]>("/customer");
    set({ customers: data });
  },
  addCustomer: async (customer: Customer) => {
    await axiosInstance.post("/customer", customer);
    get().fetchCustomers();
  },
});
