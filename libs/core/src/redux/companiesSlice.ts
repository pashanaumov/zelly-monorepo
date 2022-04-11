import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyProperties } from '../types/Companies/Company';

export interface CompaniesSliceState {
  companies: CompanyProperties[];
}

const INIT_STATE: CompaniesSliceState = {
  companies: [],
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: INIT_STATE,
  reducers: {
    setCompanies: (
      state,
      action: PayloadAction<{
        companies: CompanyProperties[];
      }>
    ) => {
      state.companies = action.payload.companies;
    },
  },
});

export const { setCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
