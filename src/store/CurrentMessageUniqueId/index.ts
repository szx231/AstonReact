import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Email {
  email: string;
}

const initialState: Email = {
  email: '',
};

export const currentMessageUniqueIdSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    uniqueIdAdd: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      console.log(state.email, 'emailstate');
    },
  },
});

export const { uniqueIdAdd } = currentMessageUniqueIdSlice.actions;

export default currentMessageUniqueIdSlice.reducer;
