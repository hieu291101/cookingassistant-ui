import { configureStore } from '@reduxjs/toolkit';
import storageReducer from '~/features/storageSlice';
import recipeReducer from '~/features/recipeSlice';
import shoppingReducer from '~/features/shoppingSlice';
import authReducer from '~/features/authSlice';
import plannerReducer from '~/features/plannerSlice';
import reviewReducer from '~/features/reviewSlide';
import ingredientReducer from '~/features/ingredientSlice';
import measureReducer from '~/features/measureSlice';

const rootReducer = {
    recipes: recipeReducer,
    storages: storageReducer,
    shoppings: shoppingReducer,
    auth: authReducer,
    planner: plannerReducer,
    reviews: reviewReducer,
    ingredients: ingredientReducer,
    measures: measureReducer
};

const store = configureStore({
    reducer: rootReducer,
});



export default store;
