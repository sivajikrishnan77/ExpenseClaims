import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClaimsState {
  requestedBy: string;
  employeeNo: string;
  requestType: string;
  Brand: string;
  purpose: string;
  voucherDate: string;
  company: string;
  businessDivision: string;
  activityDate: string;
  sites: string;
  department: string;
  micellaneous: string;
  foodBeverage: string;
  images: string[]
}

const initialState: ClaimsState = {
  requestedBy: "",
  employeeNo: "",
  requestType: "Reimbursement",
  Brand: "",
  purpose: "",
  voucherDate: "",
  company: "",
  businessDivision: "",
  activityDate: "",
  sites: "",
  department: "",
  micellaneous: "",
  foodBeverage: "",
  images: []
};

const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof ClaimsState;
         value: ClaimsState[keyof ClaimsState] }>
    ) => {
       const { field, value } = action.payload;
  (state as any)[field] = value;
    },
    addVoucherDate: (state, action: PayloadAction<string>) => {
      state.voucherDate.push(action.payload);
    },
    removeVoucherDate: (state, action: PayloadAction<string>) => {
      state.voucherDate = state.voucherDate.filter(date => date !== action.payload);
    },
    removeActivityDate: (state, action: PayloadAction<string>) => {
      state.activityDate = state.activityDate.filter(date => date !== action.payload);
    },
    addActivityDate: (state, action: PayloadAction<string>) => {
      state.activityDate.push(action.payload);
    },
    addImages: (state, action: PayloadAction<string[]>) => {
      state.images.push(...action.payload);
    },

    resetForm: () => initialState
  }
});

export const { updateField, addVoucherDate, removeVoucherDate, addActivityDate, removeActivityDate, addImages, resetForm } = claimsSlice.actions;
export default claimsSlice.reducer;