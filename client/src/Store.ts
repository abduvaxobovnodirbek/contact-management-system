import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/api/auth";
import { basketApi } from "./services/api/basket";
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
      .concat(postApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;