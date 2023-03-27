import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ShoppingApi from '~/api/shoppingApi';

export const getShopping = createAsyncThunk('shopping/getShopping', async (id, { rejectWithValue }) => {
    try {
        const response = await ShoppingApi.getAllShopping(id);
        console.log(response.data.shoppingList);
        return response.data.shoppingList;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addShopping = createAsyncThunk(
    'shopping/addShopping',
    async (data, { rejectWithValue }) => {
        try {
            const response = await ShoppingApi.addShopping(data);
            console.log(response);
            return response.data.shoppingList;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const addToShopping = createAsyncThunk(
    'shopping/addToShopping',
    async (data, { rejectWithValue }) => {
        try {
            const response = await ShoppingApi.addToShopping(data);
            console.log(response);
            return response.data.shoppingList;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const deleteShopping = createAsyncThunk(
    'shopping/deleteShopping',
    async ({id, ingredientName}, { rejectWithValue }) => {
        try {
            await ShoppingApi.deleteShopping(id, ingredientName);
            return ingredientName;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const deleteAllShopping = createAsyncThunk(
    'shopping/deleteAllShopping',
    async (id, { rejectWithValue }) => {
        try {
            await ShoppingApi.deleteAllShopping(id);
            return id;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const editShopping = createAsyncThunk(
    'shopping/editShopping',
    async ({accountId, ingredientName, data}, { rejectWithValue }) => {
        try {
            const response = await ShoppingApi.editShopping(accountId, ingredientName, data);
            return response.data.shoppingList;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

const shopping = createSlice({
    name: 'shoppings',
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
        [getShopping.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getShopping.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSucess = true;
        },
        [getShopping.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addShopping.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addShopping.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if(!state.data.find(({ingredientName}) => ingredientName === payload.ingredientName))
                state.data.push(payload);
            state.isSucess = true;
        },
        [addShopping.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addToShopping.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addToShopping.fulfilled]: (state, { payload }) => {
            state.loading = false;
            // if(!state.data.find(({ingredientName}) => ingredientName === payload.ingredientName))
            state.data.push(payload);
            state.isSucess = true;
        },
        [addToShopping.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [deleteShopping.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ ingredientName }) => ingredientName === payload);
            console.log(state.data[index])
            state.data.splice(index, 1);
        },
        [deleteAllShopping.fulfilled]: (state, { payload }) => {
            state.data= [];
        },
        [editShopping.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [editShopping.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ ingredientName }) => ingredientName === payload.ingredientName);
            state.data[index] = {
                ...state.data[index],
                ...payload,
            };
        },
        [editShopping.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        
    },
});

const { reducer, actions } = shopping;
export const { setDelete } = shopping.actions;
export default reducer;
