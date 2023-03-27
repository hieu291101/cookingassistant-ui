import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MeasureApi from '~/api/measureApi';


export const getAllMeasure = createAsyncThunk('measure/getAllMeasure', async ({ rejectWithValue }) => {
    try {
        const response = await MeasureApi.getAllMeasures();
        console.log(response);
        return response.data.measure;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const getMeasure = createAsyncThunk('measure/getMeasure', async (params, { rejectWithValue }) => {
    try {
        const response = await MeasureApi.getMeasure(params);
        console.log(response);
        return response;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addMeasure = createAsyncThunk(
    'measure/addMeasure',
    async (data, { rejectWithValue }) => {
        try {
            const response = await MeasureApi.addMeasure(data);
            console.log(data)
            console.log(response);
            return response.data.measure;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const deleteMeasure = createAsyncThunk(
    'measure/deleteMeasure',
    async (id, { rejectWithValue }) => {
        try {
            await MeasureApi.deleteMeasure(id);
            return id;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const deleteAllMeasure = createAsyncThunk(
    'measure/deleteAllMeasure',
    async (id, { rejectWithValue }) => {
        try {
            await MeasureApi.deleteAllMeasure(id);
            return id;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

export const editMeasure = createAsyncThunk(
    'measure/editMeasure',
    async ({id, data}, { rejectWithValue }) => {
        try {
            const response = await MeasureApi.editMeasure(id, data);
            return response.data.measure;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    },
);

const measure = createSlice({
    name: 'measures',
    initialState: {
        data: [],
        pagination: {},
        editData: {},
        addData: {
            recipeId: 0,
            name:''
        },
        editId: 0,
        measureId: 0,
        loading: false,
        isSucess: false,
        error: null,
        edit: false,
        del: false,
        showDelete: false,
    },
    reducers: {
        editDataByMeasure :(state, action) => {
            console.log(action.payload)
            let index = state.data.findIndex(({ measureId }) => measureId === action.payload.measureId);
            state.data[index] = {
                ...state.data[index],
                ...action.payload,
            };
        },
        setEditData: (state, action) => {
            state.editData = action.payload.editData;
        },
        setEdit: (state, action) => {
            state.edit = action.payload.edit;
        },
        setEditId: (state, action) => {
            state.editId = action.payload.editId;
        },
        setMeasureId:(state, action) => {
            state.measureId = action.payload.measureId;
        },
        setDelete: (state, action) => {
            state.showDelete = action.payload.showDelete;
        },
        setAddData: (state, action) => {
            state.addData = action.payload.addData;
        }
    },
    extraReducers: {
        [getAllMeasure.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getAllMeasure.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSucess = true;
        },
        [getAllMeasure.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [getMeasure.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getMeasure.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload.data.measure;
            state.pagination = payload.pagination;
            state.isSucess = true;
        },
        [getMeasure.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addMeasure.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addMeasure.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if(payload && !state.data.find(({name}) => name === payload.name))
                state.data.push(payload);
            state.isSucess = true;
        },
        [addMeasure.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [deleteMeasure.fulfilled]: (state, { payload }) => {
            let index = state.data.findIndex(({ measureId }) => measureId === payload);
            console.log(state.data[index])
            state.data.splice(index, 1);
        },
        [deleteAllMeasure.fulfilled]: (state, { payload }) => {
            state.data= [];
        },
        [editMeasure.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [editMeasure.fulfilled]: (state, { payload }) => {
            console.log(payload)
            let index = state.data.findIndex(({ measureId }) => measureId === payload.measureId);
            state.data[index] = {
                ...state.data[index],
                ...payload,
            };
            state.loading = false;
        },
        [editMeasure.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        
    },
});

const { reducer, actions } = measure;
export const { setDelete, setEdit, setEditData, editDataByMeasure, setEditId, setMeasureId, setAddData } = measure.actions;
export default reducer;
