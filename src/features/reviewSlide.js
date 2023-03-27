import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ReviewApi from '~/api/reviewApi';

export const getReview = createAsyncThunk('review/getReview', async (id, { rejectWithValue }) => {
    try {
        const response = await ReviewApi.getReview(id);
        console.log(response);
        return response.data.review;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const addReview = createAsyncThunk('review/addReview', async (data, { rejectWithValue }) => {
    try {
        const response = await ReviewApi.addReview(data);
        console.log(response);
        return response.data.review;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});


const review = createSlice({
    name: 'reviews',
    initialState: {
        data: [],
        loading: false,
        isSucess: false,
        error: null,
    },
    reducers: {
        
    },
    extraReducers: {
        [getReview.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getReview.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSucess = true;
        },
        [getReview.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        },
        [addReview.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [addReview.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if (payload != null && !state.data.find(({ recipeReviewId }) => recipeReviewId === payload.recipeReviewId))
                state.data.push(payload);
            state.isSuccess = true;
        },
        [addReview.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSucess = false;
        }
    },
});

const { reducer, actions } = review;
export default reducer;
