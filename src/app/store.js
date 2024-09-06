import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../features/users/usersApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "../features/modal/modalSlice";

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

// Setup listeners for RTK Query for automatic caching and refetching of data.
setupListeners(store.dispatch);

export default store;
