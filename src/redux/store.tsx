import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

import searchReducer, { initialState as searchInitialState } from '../features/search/slice';

const initialState = {
    search: searchInitialState
};

const rootReducer = combineReducers({
    search: searchReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    middleware: [thunk]
});