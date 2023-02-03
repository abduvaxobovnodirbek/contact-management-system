import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../types";

const initialState: ModalState = {
  showModal: false,
  showEmailLoginForm: true,
  showEmailRegisterForm: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
      state.showEmailLoginForm = true;
      state.showEmailRegisterForm = false;
    },
    toggleEmailLoginForm(state, action: PayloadAction<boolean>) {
      state.showEmailLoginForm = action.payload;
      state.showEmailRegisterForm = false;
    },
    toggleEmailRegisterForm(state, action: PayloadAction<boolean>) {
      state.showEmailRegisterForm = action.payload;
      state.showEmailLoginForm = false;
    },
  },
});

export const { toggleModal, toggleEmailRegisterForm, toggleEmailLoginForm } =
  modalSlice.actions;

export default modalSlice.reducer;
