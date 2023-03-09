import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../index';

export const customMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  console.log('Я кастомная мидлварина');
  return next(action);
};
