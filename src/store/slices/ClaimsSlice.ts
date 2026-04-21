import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClaimsState {
  requestedBy: string;
  employeeNo: string;
  requestType: string;
  Band: string;
  purpose: string;
  voucherDate: string;
  company: string;
  businessDivision: string;
  activityDate: string;
  sites: string;
  department: string;
  micellaneous: string;
  foodBeverage: string;
  images: string[];
}

const initialState: ClaimsState = {
  requestedBy: "",
  employeeNo: "",
  requestType: "Reimbursement",
  Band: "",
  purpose: "",
  voucherDate: "",
  company: "",
  businessDivision: "",
  activityDate: "",
  sites: "",
  department: "",
  micellaneous: "",
  foodBeverage: "",
  images: [],
};

const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof ClaimsState;
        value: ClaimsState[keyof ClaimsState];
      }>
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },

    
    addImages: (state, action: PayloadAction<string[]>) => {
      state.images.push(...action.payload);
    },

    removeImage: (state, action: PayloadAction<number>) => {
      state.images = state.images.filter(
        (_: string, index: number) => index !== action.payload
      );
    },
    resetForm: () => initialState,
  },
});

export const {
  updateField,
  addImages,
  removeImage,
  resetForm,
} = claimsSlice.actions;

export default claimsSlice.reducer;