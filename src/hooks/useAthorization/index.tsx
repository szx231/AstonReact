import { useEffect, useState } from 'react';
import axios from 'axios';
import { userIsAuth } from '../../store/Authorization/CheckUserIsAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useAthorization = () => {
  const dispatch = useAppDispatch();
  const { user, status, codeStatus } = useAppSelector((state) => state.userIsAuthSlice);

  console.log('authrq');
  useEffect(() => {
    dispatch(userIsAuth());
  }, []);

  return { user, status, codeStatus };
};
