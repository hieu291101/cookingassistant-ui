import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PlannerApi from '~/api/plannerApi';

export const getPlanner = createAsyncThunk('Planner/getPlanner', async (accountId, { rejectWithValue }) => {
    try {
        const response = await PlannerApi.getAllPlanner(accountId);
        console.log(response.data.plannermeal);
        return response.data.plannermeal;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addPlanner = createAsyncThunk('Planner/addPlanner', async (data, { rejectWithValue }) => {
    try {
        const response = await PlannerApi.addPlanner(data);
        console.log(response);
        return response.data.planner;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const deletePlanner = createAsyncThunk('Planner/deletePlanner', async (data, { rejectWithValue }) => {
    try {
        await PlannerApi.deletePlanner(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const editPlanner = createAsyncThunk(
    'Planner/editPlanner',
    async ({ accountId, ingredientName, data }, { rejectWithValue }) => {
        try {
            const response = await PlannerApi.editPlanner(accountId, ingredientName, data);
            return response.data.planner;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

const planner = createSlice({
    name: 'planners',
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
        },
    },
    extraReducers: {
        [getPlanner.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getPlanner.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSucess = true;
        },
        [getPlanner.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addPlanner.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addPlanner.fulfilled]: (state, { payload }) => {
            state.loading = false;

            if (payload != null && !state.data.find(({ plannerId }) => plannerId === payload.plannerId))
                state.data.push(payload);
            state.isSucess = true;
        },
        [addPlanner.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [deletePlanner.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [deletePlanner.fulfilled]: (state, { payload }) => {
            let dataFind = state.data.filter(
                (data) =>
                    data.dayOfWeek === payload.data.dayOfWeek &&
                    data.meal === payload.data.meal &&
                    data.recipe.recipeId === payload.data.recipeId,
            )[0];

            let index = state.data.indexOf(dataFind);
            state.data.splice(index, 1);
            state.loading = false;
        },
        [deletePlanner.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [editPlanner.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [editPlanner.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ ingredientName }) => ingredientName === payload.ingredientName);
            state.data[index] = {
                ...state.data[index],
                ...payload,
            };
        },
        [editPlanner.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
    },
});

const { reducer, actions } = planner;
export const { setDelete } = planner.actions;
export default reducer;
