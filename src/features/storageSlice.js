import StorageApi from '~/api/storageApi';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getStorage = createAsyncThunk('storage/getStorage', async (id, { rejectWithValue }) => {
    try {
        const response = await StorageApi.getAllStorage(id);
        console.log(response);
        return response.data.storage;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addStorage = createAsyncThunk('storage/addStorage', async (data, { rejectWithValue }) => {
    try {
        const response = await StorageApi.addStorage(data);
        console.log(response);
        return response.data.storage;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const editStorage = createAsyncThunk(
    'storage/editStorage',
    async ({accountId, ingredientName, data}, { rejectWithValue }) => {
        try {
            const response = await StorageApi.editStorage(accountId, ingredientName, data);
            return response.data.storage;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const deleteStorage = createAsyncThunk(
    'storage/deleteStorage',
    async ({id, ingredientName}, { rejectWithValue }) => {
        try {
            await StorageApi.deleteStorage(id, ingredientName);
            return ingredientName;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const deleteAllStorage = createAsyncThunk(
    'storage/deleteAllStorage',
    async (id, { rejectWithValue }) => {
        try {
            await StorageApi.deleteAllShopping(id);
            return id;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

const storage = createSlice({
    name: 'storages',
    initialState: {
        data: [],
        loading: false,
        isSucess: false,
        error: null,
        edit: false,
        showDelete: false,
    },
    reducers: {
        setDelete: (state, action) => {
            state.showDelete = action.payload.showDelete;
        }
    },
    extraReducers: {
        [getStorage.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getStorage.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSucess = true;
        },
        [getStorage.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addStorage.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addStorage.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if(payload && !state.data.find(({ingredientName}) => ingredientName === payload.ingredientName))
                state.data.push(payload);
            state.isSucess = true;
        },
        [addStorage.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [editStorage.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [editStorage.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ ingredientName }) => ingredientName === payload.ingredientName);
            state.data[index] = {
                ...state.data[index],
                ...payload,
            };
        },
        [editStorage.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [deleteStorage.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ ingredientName }) => ingredientName === payload);
            console.log(state.data[index])
            state.data.splice(index, 1);
        },
    },
});

const { reducer} = storage;
export const { setDelete } = storage.actions;
export default reducer;
