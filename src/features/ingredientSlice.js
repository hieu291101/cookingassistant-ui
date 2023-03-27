import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import IngredientApi from '~/api/ingredientApi';

export const getIngredient = createAsyncThunk('ingredient/getIngredient', async (params, { rejectWithValue }) => {
    try {
        const response = await IngredientApi.getIngredient(params);
        console.log(response);
        return response;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addIngredient = createAsyncThunk('ingredient/addIngredient', async (data, { rejectWithValue }) => {
    try {
        const response = await IngredientApi.addIngredient(data);
        console.log(response);
        return response.data.ingredient;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addAllIngredient = createAsyncThunk('ingredient/addAllIngredient', async ({accountId, data}, { rejectWithValue }) => {
    try {
        const response = await IngredientApi.addAllIngredient(accountId, data);
        console.log(response);
        return response.data.ingredient;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const deleteIngredient = createAsyncThunk('ingredient/deleteIngredient', async (id, { rejectWithValue }) => {
    try {
        await IngredientApi.deleteIngredient(id);
        return id;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const deleteAllIngredient = createAsyncThunk(
    'ingredient/deleteAllIngredient',
    async (id, { rejectWithValue }) => {
        try {
            await IngredientApi.deleteAllIngredient(id);
            return id;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const editIngredient = createAsyncThunk(
    'ingredient/editIngredient',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await IngredientApi.editIngredient(id, data);
            return response.data.ingredient;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

const ingredient = createSlice({
    name: 'ingredients',
    initialState: {
        data: [],
        pagination: {},
        addData: {
            ingredientId: 0,
            name: '',
            calo: 0,
            carb:0,
            fiber: 0,
            protein: 0,
        },
        editId: 0,
        editData: {},
        ingredientId: 0,
        loading: false,
        isSucess: false,
        error: null,
        edit: false,
        del: false,
        showDelete: false,
    },
    reducers: {
        editDataByIngredient: (state, action) => {
            console.log(action.payload);
            let index = state.data.findIndex(({ ingredientId }) => ingredientId === action.payload.ingredientId);
            state.data[index] = {
                ...state.data[index],
                ...action.payload,
            };
        },
        setEditId: (state, action) => {
            state.editId = action.payload.editId;
        },
        setEdit: (state, action) => {
            state.edit = action.payload.edit;
        },
        setEditData: (state, action) => {
            state.editData = action.payload.editData;
        },
        setIngredientId: (state, action) => {
            state.ingredientId = action.payload.ingredientId;
        },
        setDelete: (state, action) => {
            state.showDelete = action.payload.showDelete;
        },
        setAddData: (state, action) => {
            state.addData = action.payload.addData;
        },
    },
    extraReducers: {
        [getIngredient.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getIngredient.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload.data.ingredient;
            state.pagination = payload.pagination;
            state.isSucess = true;
        },
        [getIngredient.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addIngredient.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addIngredient.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if (payload && !state.data.find(({ name }) => name === payload.name)) state.data.push(payload);
            state.isSucess = true;
        },
        [addIngredient.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
        state.isSucess = false;
        },
        [deleteIngredient.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ ingredientId }) => ingredientId === payload);
            console.log(state.data[index]);
            state.data.splice(index, 1);
        },
        [deleteAllIngredient.fulfilled]: (state, { payload }) => {
            state.data = [];
        },
        [editIngredient.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [editIngredient.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ ingredientId }) => ingredientId === payload.ingredientId);
            state.data[index] = {
                ...state.data[index],
                ...payload,
            };
            state.loading = false;
        },
        [editIngredient.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
    },
});

const { reducer } = ingredient;
export const { setDelete, setAddData, setEditId, setEdit, setEditData, setIngredientId, editDataByIngredient } =
    ingredient.actions;
export default reducer;
