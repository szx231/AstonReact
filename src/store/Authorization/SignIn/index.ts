import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
export const signInRequest = createAsyncThunk('signIn/SignInRequest', async (user: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<string>('/api/authorization/signIn', {
      user,
    });
    return data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  user: '',
  status: '',
  errorText: '',
};

export const signInRequestSlice = createSlice({
  name: 'signInRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInRequest.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(signInRequest.fulfilled, (state, action: PayloadAction<string>) => {
      console.log(action.payload, 'actionpayload');
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(signInRequest.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.errorText = action.payload;
    });
  },
});

export default signInRequestSlice.reducer;
