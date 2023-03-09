import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
export const signUpRequest = createAsyncThunk('signUp/SignUpRequest', async (user: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<string>('/api/authorization/signUp', {
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

export const signUpRequestSlice = createSlice({
  name: 'signUpRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpRequest.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(signUpRequest.fulfilled, (state, action: PayloadAction<string>) => {
      console.log(action.payload, 'actionpayload');
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(signUpRequest.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.errorText = action.payload;
    });
  },
});

export default signUpRequestSlice.reducer;
