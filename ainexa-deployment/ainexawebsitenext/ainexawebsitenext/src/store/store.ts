import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Theme';
import languageSlice from './Language';
import blogsSlice from './blogs';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      language: languageSlice,
      blogs: blogsSlice,
    },
  });

export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
