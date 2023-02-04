import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminControlApi } from "./services/api/admin";
import { authApi } from "./services/api/auth";
import { basketApi } from "./services/api/basket";
import { categoryApi } from "./services/api/category";
import { contactApi } from "./services/api/contact";
import { postApi } from "./services/api/post";
import { searchApi } from "./services/api/search";
import users from "./services/api/user";
import authModal from "./services/ui/modalSlice";
import postSteps from "./services/ui/postStepsSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [basketApi.reducerPath]: basketApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [adminControlApi.reducerPath]: adminControlApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,

  authModal,
  postSteps,
  users,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(basketApi.middleware)
      .concat(searchApi.middleware)
      .concat(contactApi.middleware)
      .concat(adminControlApi.middleware)
      .concat(categoryApi.middleware)
      .concat(postApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
