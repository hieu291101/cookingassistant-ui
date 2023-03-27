import RecipeApi from '~/api/recipesApi';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getRecipe = createAsyncThunk('recipe/getRecipe', async (params, { rejectWithValue }) => {
    try {
        const response = await RecipeApi.recipes(params);
        console.log(response);
        return response;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const searchRecipe = createAsyncThunk('recipe/searchRecipe', async (params, { rejectWithValue }) => {
    try {
        const response = await RecipeApi.search(params);
        console.log(response);
        return response.data.recipe;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const filterRecipe = createAsyncThunk('recipe/filterRecipe', async (params, { rejectWithValue }) => {
    try {
        const response = await RecipeApi.filter(params);
        console.log(response);
        return response.data.recipe;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const findRecipeById = createAsyncThunk('recipe/findRecipeById', async (id, { rejectWithValue }) => {
    try {
        const response = await RecipeApi.get(id);
        console.log(response);
        return response.data.recipe;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const getRecipeDetail = createAsyncThunk('recipe/getRecipeDetail', async (id, { rejectWithValue }) => {
    try {
        const response = await RecipeApi.getDetail(id);
        console.log(response);
        return response.data.recipeDetail;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addRecipe = createAsyncThunk(
    'recipe/addRecipe',
    async (data, { rejectWithValue }) => {
        try {
            const response = await RecipeApi.add(data);
            console.log(response);
            return response.data.recipe;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);



export const updateRecipe = createAsyncThunk(
    'recipe/updateRecipe',
    async ({id, data}, { rejectWithValue }) => {
        try {
            const response = await RecipeApi.update(id, data);
            console.log(response);
            return response.data.recipe;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const deleteRecipe = createAsyncThunk('recipe/deleteRecipe', async (id, { rejectWithValue }) => {
    try {
        await RecipeApi.delete(id);
        return id;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

const recipe = createSlice({
    name: 'recipes',
    initialState: {
        data: [],
        recipe: {},
        details: [],
        pagination: {},
        addData: {},
        loading: false,
        isSucess: false,
        isSearch: false,
        error: null,
        edit: false,
        del: false,
        showDelete: false,
        recipeId: 0,
        prevData: { serving: null, details: [] },
    },
    reducers: {
        setRecipe: (state, action) => {
            state.recipe = action.payload.recipe;
        },
        setRecipeId: (state, action) => {
            state.recipeId = action.payload.recipeId;
        },
        setEdit: (state, action) => {
            state.edit = action.payload.edit;
        },
        setServing: (state, action) => {
            state.data.yields = action.payload.serving;
        },
        setDetails: (state, action) => {
            state.details = action.payload.details;
        },
        setAddData: (state, action) => {
            state.addData = action.payload.addData;
        },
        setDelete: (state, action) => {
            state.showDelete = action.payload.showDelete;
        },
    },
    extraReducers: {
        [getRecipe.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getRecipe.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload.data.recipe;
            state.pagination = payload.pagination;

            state.isSucess = true;
        },
        [getRecipe.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [searchRecipe.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [searchRecipe.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
            state.isSearch = true;
        },
        [searchRecipe.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [filterRecipe.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [filterRecipe.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSucess = true;
        },
        [filterRecipe.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [findRecipeById.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [findRecipeById.fulfilled]: (state, { payload }) => {
            state.prevData.serving = payload.yields;
            state.loading = false;
            state.recipe = payload;
            state.isSucess = true;
        },
        [findRecipeById.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [getRecipeDetail.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getRecipeDetail.fulfilled]: (state, { payload }) => {
            state.prevData.details = payload;
            state.loading = false;
            state.details = payload;
            state.isSucess = true;
        },
        [getRecipeDetail.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addRecipe.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addRecipe.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if(!state.data.find(({recipeId}) => recipeId === payload.recipeId))
                state.data.push(payload);
            state.isSucess = true;
        },
        [addRecipe.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [deleteRecipe.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ recipeId }) => recipeId === payload);
            console.log(state.data[index]);
            state.data.splice(index, 1);
        },
        [updateRecipe.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [updateRecipe.fulfilled]: (state, { payload }) => {
            // let index = state.data.findIndex(({ recipeId }) => recipeId === payload.recipeId);
            // state.recipe=payload.recipe
        },
        [updateRecipe.rejected]: (state, { payload }) => {
            state.message = payload;
            state.isSucess = false;
        },
    },
});

const { reducer } = recipe;
export const { setServing, setDetails, setEdit, setRecipe, setAddData, setDelete, setRecipeId } = recipe.actions;
export default reducer;
