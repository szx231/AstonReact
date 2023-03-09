import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const userIsAuth = createAsyncThunk('userIsAuthReq/userIsAuth', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<any>('/api/userIsAuth');
    return data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response);
  }
});

const initialState = {
  user: '',
  status: '',
  errorText: '',
  codeStatus: '',
};

export const userIsAuthSlice = createSlice({
  name: 'userIsAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userIsAuth.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(userIsAuth.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(userIsAuth.rejected, (state, action: PayloadAction<any>) => {
      state.codeStatus = action.payload.status;
      state.status = 'error';
      state.errorText = action.payload;
    });
  },
});

export default userIsAuthSlice.reducer;
