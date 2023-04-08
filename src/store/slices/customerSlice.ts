import { axiosInstance } from "@/config/axios";
import { Customer, CustomerWithId } from "@/models/Customer";
import { StateCreator } from "zustand";

export interface CustomerSlice {
  customers: CustomerWithId[];
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Customer) => Promise<void>;
  deleteCustomer: (id: CustomerWithId["id"]) => Promise<void>;
  editCustomer: (id: CustomerWithId["id"], customer: Customer) => Promise<void>;
}

export const createCustomerSlice: StateCreator<CustomerSlice> = (set, get) => ({
  customers: [],
  fetchCustomers: async () => {
    const { data } = await axiosInstance.get<CustomerWithId[]>("/customer");
    set({ customers: data });
  },
  addCustomer: async (customer) => {
    await axiosInstance.post("/customer", customer);
    get().fetchCustomers();
  },
  deleteCustomer: async (id) => {
    const newCustomers = get().customers.filter(
      (customer) => customer.id !== id
    );
    set({ customers: newCustomers });
    await axiosInstance.delete(`/customer/${id}`);
  },

  editCustomer: async (id, customer) => {
    const newCustomers = get().customers.map((item) => {
      if (item.id === id) {
        return {
          ...customer,
          id,
        };
      }

      return item;
    });

    set({ customers: newCustomers });

    await axiosInstance.put(`/customer/${id}`, customer);
  },
});
