import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModals: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const modalId = action.payload;
      state.openModals[modalId] = { isOpen: true };
    },
    closeModal: (state, action) => {
      delete state.openModals[action.payload];
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
