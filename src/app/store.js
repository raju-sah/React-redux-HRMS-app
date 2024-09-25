import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "../features/modal/modalSlice";
import { booksApi } from "../features/books/booksApiSlice";
import { bookCategoryApi } from "../features/books/bookscategory/booksCategoryApiSlice";
import { authorApi } from "../features/books/author/authorApiSlice";
import { genreApi } from "../features/moviesAndSeries/genres/GenreApiSlice";
import { movieApi } from "../features/moviesAndSeries/movies/MovieApiSlice";
import { webSeriesApi } from "../features/moviesAndSeries/web-series/WebSeriesApiSlice";
import { animeApi } from "../features/moviesAndSeries/animes/AnimeApiSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    [bookCategoryApi.reducerPath]: bookCategoryApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [webSeriesApi.reducerPath]: webSeriesApi.reducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(bookCategoryApi.middleware)
      .concat(authorApi.middleware)
      .concat(genreApi.middleware)
      .concat(movieApi.middleware)
      .concat(webSeriesApi.middleware)
      .concat(animeApi.middleware),

});

// Setup listeners for RTK Query for automatic caching and refetching of data.
setupListeners(store.dispatch);

export default store;
