import { useState, useContext } from 'react';
import { ThemingContext } from '../../store/Theme';

export const useGetTheme = () => {
  const { theme, setTheme } = useContext(ThemingContext);

  return [theme, setTheme];
};
