import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalUIState {
  showLoading: boolean;
}

const INIT_STATE: GlobalUIState = {
  showLoading: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: INIT_STATE,
  reducers: {
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.showLoading = action.payload;
    },
  },
});

export const { toggleLoading } = uiSlice.actions;
export default uiSlice.reducer;
