import { create } from "zustand";
import { CustomerSlice, createCustomerSlice } from "./slices/customerSlice";
import { EmployeeSlice, createEmployeeSlice } from "./slices/employeeSlice";
import { TravelSlice, createTravelSlice } from "./slices/travelSlice";

type StoreState = CustomerSlice & EmployeeSlice & TravelSlice;

export const useAppStore = create<StoreState>((...a) => ({
  ...createCustomerSlice(...a),
  ...createEmployeeSlice(...a),
  ...createTravelSlice(...a),
}));
