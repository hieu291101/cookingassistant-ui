import AuthApi from '~/api/authApi';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginAccount = createAsyncThunk('account/getAccount', async (data, { rejectWithValue }) => {
    try {
        const response = await AuthApi.login(data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error.response.message);
        rejectWithValue(error.response.data);
    }
});

export const logoutAccount = createAsyncThunk('account/logoutAccount', async (data, { rejectWithValue }) => {
    try {
        const response = await AuthApi.logout(data);
        localStorage.removeItem('user');
        console.log(response);
        return response.message;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const sendForgotPasswordEmail = createAsyncThunk(
    'account/sendEmailFPAccount',
    async (data, { rejectWithValue }) => {
        try {
            const response = await AuthApi.sendForgotPasswordEmail(data);
            console.log(response);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

const user = JSON.parse(localStorage.getItem('user'));

const storage = createSlice({
    name: 'auth',
    initialState: {
        data: user ? user : null,
        isLoggedIn: user ? true : false,
        loading: false,
        isSucess: false,
        error: null,
        edit: false,
    },
    reducers: {
        logoutUser(state){
            state.data = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user');
        }
    },
    extraReducers: {
        [loginAccount.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [loginAccount.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
            state.isLoggedIn = true;
        },
        [loginAccount.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
        [sendForgotPasswordEmail.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [sendForgotPasswordEmail.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
        },
        [sendForgotPasswordEmail.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
        },
        [logoutAccount.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [logoutAccount.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = null;
            state.message = payload;
            state.isLoggedIn = false;
        },
        [logoutAccount.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
        },
    },
});

const { reducer } = storage;
export const { logoutUser } = storage.actions
export default reducer;
