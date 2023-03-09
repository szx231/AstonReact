import { useState, useContext } from 'react';
import { AuthContext } from '../../components/hoc';

export const useGetUser = () => {
  const { username, surname, role_name } = useContext(AuthContext);

  return { username, surname, role_name };
};
