import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "../features/modal/modalSlice";
import { usersApi } from "../features/books/booksApiSlice";
import { bookCategoryApi } from "../features/books/bookscategory/booksCategoryApiSlice";
import { authorApi } from "../features/books/author/authorApiSlice";

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    modal: modalReducer,
    [bookCategoryApi.reducerPath]: bookCategoryApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(bookCategoryApi.middleware)
      .concat(authorApi.middleware),
});

// Setup listeners for RTK Query for automatic caching and refetching of data.
setupListeners(store.dispatch);

export default store;
