import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const API_URL = '/api/users/';

const registerUser = async (userData) => {
	const res = await axios.post(API_URL, userData);
	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}

	return res.data;
};
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkApi) => {
		try {
			return await registerUser(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkApi.rejectWithValue(message);
		}
	}
);

const initialState = {
	user: user ? user : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isSuccess = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.user = null;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.paylaod;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
