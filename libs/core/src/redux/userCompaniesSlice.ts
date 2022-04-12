import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyProperties } from '../types/Companies/Company';

export interface UserCompaniesSliceState {
  companies: CompanyProperties[];
}

const INIT_STATE: UserCompaniesSliceState = {
  companies: [],
};

export const userCompaniesSlice = createSlice({
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

export const { setCompanies } = userCompaniesSlice.actions;
export default userCompaniesSlice.reducer;
