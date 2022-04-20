import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const API_URL = '/api/users/';

//Register user service
const registerUser = async (userData) => {
	const res = await axios.post(API_URL, userData);
	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}

	return res.data;
};

//Login user service
const loginUser = async (userData) => {
	const res = await axios.post(API_URL + 'login', userData);
	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}

	return res.data;
};
const logOut = async () => {
	localStorage.removeItem('user');
};

export const _logOut = createAsyncThunk('auth/logout', async () => {
	try {
		await logOut();
	} catch (error) {}
});
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

export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
	try {
		return await loginUser(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();

		return thunkApi.rejectWithValue(message);
	}
});

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
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isSuccess = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.user = null;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.paylaod;
			})

			.addCase(_logOut.fulfilled, (state) => (state.user = null));
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
