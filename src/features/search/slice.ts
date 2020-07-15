import { SliceState, ResultAction, IsLoadingAction } from '../../types';

import { createSlice } from '@reduxjs/toolkit';

export const initialState: SliceState = {
    result: {
        users: [],
        repos: []
    },
    isLoading: false,
    error: {
        users: null,
        repos: null
    }
};

const users = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setResultByTarget(state, action) {
            const { target, result }: ResultAction = action.payload;

            state.result[target] = result;
        },
        setIsLoading(state, action) {
            const { isLoading }: IsLoadingAction = action.payload;

            state.isLoading = isLoading;
        },
        setErrorByTarget(state, action) {
            const { target, error } = action.payload;

            state.error[target] = error;
        }
    }
});

export const { setResultByTarget, setIsLoading, setErrorByTarget } = users.actions;

export default users.reducer;