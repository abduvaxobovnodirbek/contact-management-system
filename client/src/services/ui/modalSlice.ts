import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../types";

const initialState: ModalState = {
  showModal: false,
  showEmailLoginForm: true,
  showEmailRegisterForm: false,
  showProfileModal: false,

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
    toggleProfileModal(state, action: PayloadAction<boolean>) {
      state.showProfileModal = action.payload;
    },
  },
});

export const { toggleModal, toggleEmailRegisterForm, toggleEmailLoginForm,toggleProfileModal } =
  modalSlice.actions;

export default modalSlice.reducer;
