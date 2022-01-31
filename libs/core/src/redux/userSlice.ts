import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ZellyUser } from '../types/Auth/LoginResponse';

export interface UserState {
  user: ZellyUser | null;
}

const INIT_STATE: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: ZellyUser | null;
      }>,
    ) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
