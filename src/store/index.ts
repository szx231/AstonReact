import { configureStore } from '@reduxjs/toolkit';
import currentCategorySlice from './CurrentCategory/index';
import signUpRequestSlice from './Authorization/SignUp';
import userIsAuthSlice from './Authorization/CheckUserIsAuth';
import favoriteMessagesSlice from './Favorite';
import searchSlice from './Search';
import fetchLogOutSlice from './LogOut';
import currentMessageUniqueIdSlice from './CurrentMessageUniqueId';
import { emailsApi } from './EmailsApi';
import { customMiddleware } from './CustomMiddlware/PrintConsol';

export const store = configureStore({
  reducer: {
    [emailsApi.reducerPath]: emailsApi.reducer,
    currentCategorySlice,
    signUpRequestSlice,
    userIsAuthSlice,
    favoriteMessagesSlice,
    searchSlice,
    fetchLogOutSlice,
    currentMessageUniqueIdSlice,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(customMiddleware, emailsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
