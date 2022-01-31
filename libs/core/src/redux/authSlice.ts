import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  authenticated: string | null;
  errorMessage: string;
}

const INIT_STATE: AuthState = {
  authenticated: null,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INIT_STATE,
  reducers: {
    authUser: (state, action: PayloadAction<string | null>) => {
      state.authenticated = action.payload;
    },
    authError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { authUser, authError } = authSlice.actions;
export default authSlice.reducer;
